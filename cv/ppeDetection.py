from ultralytics import YOLO
import cv2
import cvzone
import math
from cv_bridge import CvBridge
from sensor_msgs.msg import Image
import rospy
from sort import *

cap = cv2.VideoCapture("/home/gauri/test_wk/src/industryHelpTrash/ppe-2-1.mp4")
bridge = CvBridge()
rospy.init_node('image_publisher', anonymous=True)
image_publisher = rospy.Publisher('workers_footage', Image, queue_size=10)

model = YOLO('/home/gauri/test_wk/src/industryHelpTrash/ppe(1)/ppe.pt')
classNames = ['gloves', 'hardhat', 'no-gloves', 'no-hardhat', 'no-shoes', 'no-vest', 'person', 'shoes', 'vest']
tracker=Sort(max_age=20,min_hits=3,iou_threshold=0.3)
MyColor = (0, 0, 255)
defaulty = []
while True:
    success, img = cap.read()
    
    

    results = model(img, stream=True)

    detections = np.empty((0,5))
    
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
                    currentArray=np.array([x1,y1,x2,y2,conf])
                    detections=np.vstack([detections,currentArray])

                elif currentClass == 'hardhat' or currentClass == 'vest' or currentClass == "gloves" or currentClass == 'shoes':
                    myColor = (0, 255, 0)

                cvzone.putTextRect(img, f'{classNames[cls]} {conf}',
                                   (max(0, x1), max(35, y1)), scale=1, thickness=1, colorB=myColor,
                                   colorT=(255, 255, 255), colorR=myColor, offset=5)
                cv2.rectangle(img, (x1, y1), (x2, y2), myColor, 3)
    
    resultsTracker=tracker.update(detections)

    for result in resultsTracker:
        
        x1,y1,x2,y2,id=result
        x1,y1,x2,y2= int(x1),int(y1),int(x2),int(y2)


        print(result)
        w, h = x2-x1, y2-y1
        # cv2.rectangle(img,(x1,y1),(x2,y2),(255,0,0),3)
        cx,cy=x1+w//2,y1+h//2
        cv2.circle(img,(cx,cy),5,(255,0,255),cv2.FILLED)
        if currentClass == 'no-hardhat' or currentClass == 'no-vest' or currentClass == "no-gloves" or currentClass == 'no shoes':
            if defaulty.count(id)==0:
                defaulty.append(id)

    cvzone.putTextRect(img,f'Count:{len(defaulty)}',(50,120) )
    ros_image_msg = bridge.cv2_to_imgmsg(img, encoding="bgr8")
    image_publisher.publish(ros_image_msg)
        



    cv2.imshow('image', img)
    cv2.waitKey(1)
