# https://github.com/nilutpolkashyap/body_posture_analysis
from helper import findDistance, findAngle
import cv2
import time
import mediapipe as mp

# Initialize frame counters.
good_frames = 0
bad_frames = 0

# Font type.
font = cv2.FONT_HERSHEY_SIMPLEX

# Colors.
blue = (255, 127, 0)
red = (50, 50, 255)
green = (127, 255, 0)
dark_blue = (127, 20, 0)
light_green = (127, 233, 100)
yellow = (0, 255, 255)
pink = (255, 0, 255)

# Initialize mediapipe pose class.
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# For webcam input replace file name with 0.
file_name = '0'
cap = cv2.VideoCapture(file_name)

# Meta.
fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
frame_size = (width, height)
fourcc = cv2.VideoWriter_fourcc(*'mp4v')

# Video writer.
video_output = cv2.VideoWriter('output.mp4', fourcc, fps, frame_size)

# Capture frames.
success, image = cap.read()
if not success:
    print("Null.Frames")
    break
# Get fps.
fps = cap.get(cv2.CAP_PROP_FPS)
# Get height and width of the frame.
h, w = image.shape[:2]

# Convert the BGR image to RGB.
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Process the image.
keypoints = pose.process(image)

# Convert the image back to BGR.
image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)