from ultralytics import YOLO
import cv2
import cvzone
import math
from cv_bridge import CvBridge
from sensor_msgs.msg import Image
import rospy

cap = cv2.VideoCapture("/home/gauri/test_wk/src/industryManagement/ppe-2-1.mp4")
bridge = CvBridge()
rospy.init_node('image_publisher', anonymous=True)
image_publisher = rospy.Publisher('/your_image_topic', Image, queue_size=10)

model = YOLO('/home/gauri/test_wk/src/industryManagement/ppe(1)/ppe.pt')
classNames = ['gloves', 'hardhat', 'no-gloves', 'no-hardhat', 'no-shoes', 'no-vest', 'person', 'shoes', 'vest']
MyColor = (0, 0, 255)

while True:
    success, img = cap.read()
    ros_image_msg = bridge.cv2_to_imgmsg(img, encoding="bgr8")
    image_publisher.publish(ros_image_msg)

    results = model(img, stream=True)
    
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            print(x1, y1, x2, y2)
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

            conf = math.ceil((box.conf[0]) * 100) / 100
            cls = int(box.cls[0])
            currentClass = classNames[cls]
            print(currentClass)

            if conf > 0.5:
                if currentClass == 'no-hardhat' or currentClass == 'no-vest' or currentClass == "no-gloves" or currentClass == 'no shoes':
                    myColor = (0, 0, 255)
                elif currentClass == 'hardhat' or currentClass == 'vest' or currentClass == "gloves" or currentClass == 'shoes':
                    myColor = (0, 255, 0)

                cvzone.putTextRect(img, f'{classNames[cls]} {conf}',
                                   (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor,
                                   colorT=(255, 255, 255), colorR=myColor, offset=5)
                cv2.rectangle(img, (x1, y1), (x2, y2), myColor, 3)

    cv2.imshow('image', img)
    cv2.waitKey(1)
