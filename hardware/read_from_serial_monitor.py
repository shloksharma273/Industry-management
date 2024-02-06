import serial.tools.list_ports
import rospy
from std_msgs.msg import Float32

ports = serial.tools.list_ports.comports()
serialInst = serial.Serial()

portsList = []

rospy.init_node('move_turtle', anonymous=True)
temp_pub = rospy.Publisher('/temp', Float32, queue_size= 10)
gas_pub =  rospy.Publisher('/gas', Float32, queue_size= 10)

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

count = 0
while True:
	if serialInst.in_waiting:
		packet = serialInst.readline()
		if count == 0:
			print("temprature: ", packet.decode('utf') )
			temp_pub.publish(float(packet.decode('utf')))
			
		elif count == 1:
			print("ammonia level: ", packet.decode('utf'))
			gas_pub.publish(float(packet.decode('utf')))
			
		if count >= 1:
			count = 0
		else : 
			count += 1
		# print(packet.decode('utf').rstrip('\n'))
