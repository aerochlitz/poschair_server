import random
import time
import sys

def readInput():
    message = input()

    if message is not '':
        print('Got input: ' + message)

def sendSensorData():
    print("hewwo from the python script")
    time.sleep(2)

running = True

while running:
    sendSensorData()
    readInput()

    # print(random.getrandbits(1), random.getrandbits(1), random.getrandbits(1), random.getrandbits(1), random.getrandbits(1), random.getrandbits(1), random.getrandbits(1), random.getrandbits(1))
    # time.sleep(2)






