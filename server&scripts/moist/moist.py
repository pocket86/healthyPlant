import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN)

moist = GPIO.input(17)
moist = str(moist)
time.sleep(3)
print "Moisture is " 
print moist
moistFile = open('/moist.txt', 'w')
moistFile.write(moist)
