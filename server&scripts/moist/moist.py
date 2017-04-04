import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN)

moist = GPIO.input(17)
moist = str(moist)

print moist
moistFile = open('/moist.txt', 'w')
moistFile.write(moist)
