#!/usr/bin/env python3
import rospy
import socket
from std_msgs.msg import Int32

s = socket.socket()
s.bind(('0.0.0.0', 10000))
s.listen(0)

current_data  = previous_data = 0

def publisher(data):
    rospy.init_node('move_turtle', anonymous=True)
    pub = rospy.Publisher('/data', Int32, queue_size= 10)
    pub.publish(data)
    print(data)
    # rospy.spin()
    

while True:
    client, addr = s.accept()

    while True:
        content = client.recv(32)
        if len(content) == 0:
            break
        else:
            # Assuming the data received is a string representation of a float
            float_content = float(content.decode('utf-8'))
            print(float_content)
            current_data = float_content
            if (abs(current_data - previous_data) > 10.0) :
                publisher(1)
            else :
                publisher(0)
            previous_data = current_data
        
    # print("Closing connection")
    client.close()
   