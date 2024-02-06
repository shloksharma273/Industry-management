import serial.tools.list_ports

ports = serial.tools.list_ports.comports()
serialInst = serial.Serial()

portsList = []

for onePort in ports:
    portsList.append(str(onePort))
    print(str(onePort))

portVar = "/dev/ttyUSB0"

for x in range(0,len(portsList)):
    if portsList[x].startswith("/dev/ttyUSB0" ):
        portVar = "/dev/ttyUSB0"
        print(portVar)

serialInst.baudrfate = 9600
serialInst.port = portVar
serialInst.open()

while True:
	if serialInst.in_waiting:
		packet = serialInst.readline()
		print(packet.decode('utf').rstrip('\n'))
