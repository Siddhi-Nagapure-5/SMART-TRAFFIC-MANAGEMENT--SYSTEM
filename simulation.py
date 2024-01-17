import pygame
import time
import random
import threading
import sys

# directions
# 0-RIGHT DIRECTION
# 1-DOWN DIRECTION
# 2-LEFT DIRECTION
# 3-UP DIRECTION
# crossed- REPRESENTS WHERE THE VEHICLE HAS CROSSED THE SIGNAL OR NOT

#
# import pygame
#
# # Initialize Pygame
# pygame.init()
#
# # Set the dimensions of the window
# window_size = (1200, 800)
#
# # Create the window
# screen = pygame.display.set_mode(window_size)
#
# # Load the image
# image = pygame.image.load('images/intersection.png')
#
# # Draw the image on the screen
# screen.blit(image, (0, 10))
#
# # Update the display
# pygame.display.update()
#
# # Main game loop
# while True:
#     # Handle events
#     for event in pygame.event.get():
#         if event.type == pygame.QUIT:
#             pygame.quit()
#             quit()

# Default values of signal timers in seconds
defaultGreen = {0:20, 1:20, 2:20, 3:20}
defaultRed = 150
defaultYellow = 5
signals = []
noOfSignals = 4
currentGreen = 0   # Indicates which signal is green currently
nextGreen = (currentGreen+1)%noOfSignals
currentYellow = 0   # Indicates whether yellow signal is on or off

#BASED ON REAL -TIME DATA WE WILL TAKE THE DEFAULT SPEEDS FOR THE VEHICLES
a=float(input("ENTER AVERAGE SPEED OF CAR\n"))
b=float(input("ENTER AVERAGE SPEED OF BUS\n"))
c=float(input("ENTER AVERAGE SPEED OF TRUCK\n"))
d=float(input("ENTER AVERAGE SPEED OF BIKE\n"))

# average speeds of vehicles
speeds = {'car': a, 'bus': b, 'truck': c, 'bike': d};

# coordinates of vehicles
x= {'right':[0,0,0], 'down':[605,602,652], 'left':[1200,1200,1200], 'up':[502,527,557]};

y = {'right':[348,370,398], 'down':[0,0,0], 'left':[550,531,481], 'up':[800,800,800]};


vehicles = {'right': {0:[], 1:[], 2:[], 'crossed':0}, 'down': {0:[], 1:[], 2:[], 'crossed':0}, 'left': {0:[], 1:[], 2:[], 'crossed':0}, 'up': {0:[], 1:[], 2:[], 'crossed':0}}
vehicleTypes = {0:'car', 1:'bus', 2:'truck', 3:'bike'}

directionNumbers = {0:'right', 1:'down', 2:'left', 3:'up'}
# Coordinates of signal image, timer, and vehicle count
signalCoods = [(400,230),(800,230),(800,590),(390,590)]
signalTimerCoods = [(400,210),(800,210),(800,570),(390,570)]
# Coordinates of stop lines
stopLines = {'right': 480, 'down': 330, 'left': 750, 'up': 555}
defaultStop = {'right': 470, 'down': 320, 'left': 760, 'up': 565}
# Gap between vehicles
stoppingGap = 15 # stopping gap
movingGap = 15   # moving gap


pygame.init()
simulation = pygame.sprite.Group()

class TrafficSignal:
    def __init__(self, red, yellow, green):
        self.red = red
        self.yellow = yellow
        self.green = green
        self.signalText = ""


class Vehicle(pygame.sprite.Sprite):
    def __init__(self, lane, vehicleClass, direction_number, direction):
        pygame.sprite.Sprite.__init__(self)
        self.lane = lane
        self.vehicleClass = vehicleClass
        self.speed = speeds[vehicleClass]
        self.direction_number = direction_number
        self.direction = direction
        self.x = x[direction][lane]
        self.y = y[direction][lane]
        self.crossed = 0
        vehicles[direction][lane].append(self)
        self.index = len(vehicles[direction][lane]) - 1
        path = "images/" + direction + "/" + vehicleClass + ".png"
        self.image = pygame.image.load(path)
        if (len(vehicles[direction][lane]) > 1
                and vehicles[direction][lane][self.index - 1].crossed == 0):
            if (direction == 'right'):
                self.stop =vehicles[direction][lane][self.index - 1].stop
                - vehicles[direction][lane][self.index - 1].image.get_rect().width
                - stoppingGap
            elif (direction == 'left'):
                self.stop =vehicles[direction][lane][self.index - 1].stop
                + vehicles[direction][lane][self.index - 1].image.get_rect().width
                + stoppingGap
            elif (direction == 'down'):
                self.stop =vehicles[direction][lane][self.index - 1].stop
                - vehicles[direction][lane][self.index - 1].image.get_rect().height
                - stoppingGap
            elif (direction == 'up'):
                self.stop =vehicles[direction][lane][self.index - 1].stop
                + vehicles[direction][lane][self.index - 1].image.get_rect().height
                + stoppingGap
        else:
            self.stop = defaultStop[direction]

        if (direction == 'right'):
            temp = self.image.get_rect().width + stoppingGap
            x[direction][lane] -= temp
        elif (direction == 'left'):
            temp = self.image.get_rect().width + stoppingGap
            x[direction][lane] += temp
        elif (direction == 'down'):
            temp = self.image.get_rect().height + stoppingGap
            y[direction][lane] -= temp
        elif (direction == 'up'):
            temp = self.image.get_rect().height + stoppingGap
            y[direction][lane] += temp
        simulation.add(self)

    def render(self, screen):
        screen.blit(self.image, (self.x, self.y))

    def move(self):
            if (self.direction == 'right'):
                if (self.crossed == 0 and self.x + self.image.get_rect().width > stopLines[self.direction]):
                    self.crossed = 1
                if ((self.x + self.image.get_rect().width <= self.stop
                     or self.crossed == 1 or (currentGreen == 0 and currentYellow == 0))
                        and (self.index == 0 or self.x + self.image.get_rect().width
                             < (vehicles[self.direction][self.lane][self.index - 1].x - movingGap))):
                    self.x += self.speed
            elif (self.direction == 'down'):
                if (self.crossed == 0 and
                        self.y + self.image.get_rect().height > stopLines[self.direction]):
                    self.crossed = 1
                if ((self.y + self.image.get_rect().height <= self.stop
                     or self.crossed == 1 or (currentGreen == 1 and currentYellow == 0))
                        and (self.index == 0 or self.y + self.image.get_rect().height
                             < (vehicles[self.direction][self.lane][self.index - 1].y - movingGap))):
                    self.y += self.speed
            elif (self.direction == 'left'):
                if (self.crossed == 0 and
                        self.x < stopLines[self.direction]):
                    self.crossed = 1
                if ((self.x >= self.stop or self.crossed == 1
                     or (currentGreen == 2 and currentYellow == 0))
                        and (self.index == 0 or self.x
                             > (vehicles[self.direction][self.lane][self.index - 1].x
                                + vehicles[self.direction][self.lane][self.index - 1].image.get_rect().width
                                + movingGap))):
                    self.x -= self.speed
            elif (self.direction == 'up'):
                if (self.crossed == 0 and
                        self.y < stopLines[self.direction]):
                    self.crossed = 1
                if ((self.y >= self.stop or self.crossed == 1
                     or (currentGreen == 3 and currentYellow == 0))
                        and (self.index == 0 or self.y
                             > (vehicles[self.direction][self.lane][self.index - 1].y
                                + vehicles[self.direction][self.lane][self.index - 1].image.get_rect().height
                                + movingGap))):
                    self.y -= self.speed

def updateValues():
        for i in range(0, noOfSignals):
            if (i == currentGreen):
                if (currentYellow == 0):
                    signals[i].green -= 1
                else:
                    signals[i].yellow -= 1
            else:
                signals[i].red -= 1

def repeat():
        global currentGreen, currentYellow, nextGreen
        while (signals[currentGreen].green > 0):
            updateValues()
            time.sleep(1)
        currentYellow = 1
        for i in range(0, 3):
            for vehicle in vehicles[directionNumbers[currentGreen]][i]:
                vehicle.stop = defaultStop[directionNumbers[currentGreen]]
        while (signals[currentGreen].yellow > 0):
            updateValues()
            time.sleep(1)
        currentYellow = 0

        signals[currentGreen].green = defaultGreen[currentGreen]
        signals[currentGreen].yellow = defaultYellow
        signals[currentGreen].red = defaultRed

        currentGreen = nextGreen
        nextGreen = (currentGreen + 1) % noOfSignals
        signals[nextGreen].red = signals[currentGreen].yellow + signals[currentGreen].green
        repeat()

def initialize():
        ts1 = TrafficSignal(0, defaultYellow, defaultGreen[0])
        signals.append(ts1)
        ts2 = TrafficSignal(ts1.yellow + ts1.green, defaultYellow, defaultGreen[1])
        signals.append(ts2)
        ts3 = TrafficSignal(defaultRed, defaultYellow, defaultGreen[2])
        signals.append(ts3)
        ts4 = TrafficSignal(defaultRed, defaultYellow, defaultGreen[3])
        signals.append(ts4)
        repeat()


def generateVehicles():
    while(True):
        vehicle_type = random.randint(0,3)
        lane_number = random.randint(1,2)
        temp = random.randint(0,99)
        direction_number = 0
        dist= [25,50,75,100]
        if(temp<dist[0]):
            direction_number = 0
        elif(temp<dist[1]):
            direction_number = 1
        elif(temp<dist[2]):
            direction_number = 2
        elif(temp<dist[3]):
            direction_number = 3
        Vehicle(lane_number, vehicleTypes[vehicle_type], direction_number, directionNumbers[direction_number])
        time.sleep(3)


class Main:
    thread1 = threading.Thread(name="initialization", target=initialize, args=())
    thread1.daemon = True
    thread1.start()

    black = (0, 0, 0)
    white = (255, 255, 255)
    screenWidth = 1210
    screenHeight = 800
    screenSize = (screenWidth, screenHeight)
    background = pygame.image.load('images/intersection2.png')
    screen = pygame.display.set_mode(screenSize)
    pygame.display.set_caption("SIMULATION")
    redSignal = pygame.image.load('images/signals/red.png')
    yellowSignal = pygame.image.load('images/signals/yellow.png')
    greenSignal = pygame.image.load('images/signals/green.png')
    font = pygame.font.Font(None, 30)
    thread2 = threading.Thread(name="generateVehicles", target=generateVehicles, args=())
    thread2.daemon = True
    thread2.start()
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
        screen.blit(background, (0, 0))
        for i in range(0, noOfSignals):
            if (i == currentGreen):
                if (currentYellow == 1):
                    signals[i].signalText = signals[i].yellow
                    screen.blit(yellowSignal, signalCoods[i])
                else:
                    signals[i].signalText = signals[i].green
                    screen.blit(greenSignal, signalCoods[i])
            else:
                if (signals[i].red <= 15):
                    signals[i].signalText = signals[i].red
                else:
                    signals[i].signalText = "---"
                screen.blit(redSignal, signalCoods[i])
        signalTexts = ["", "", "", ""]
        for i in range(0, noOfSignals):
           signalTexts[i] = font.render(str(signals[i].signalText), True, white, black)
           screen.blit(signalTexts[i], signalTimerCoods[i])

        for vehicle in simulation:
            screen.blit(vehicle.image, [vehicle.x, vehicle.y])
            vehicle.move()
        pygame.display.update()







