import cv2
import mediapipe as mp
import math as m
# Assuming these functions are defined
def findDistance(x1, y1, x2, y2):
    dist = m.sqrt((x2-x1)**2+(y2-y1)**2)
    return dist

def findAngle(x1, y1, x2, y2):
    theta = m.acos( (y2 -y1)*(-y1) / (m.sqrt(
        (x2 - x1)**2 + (y2 - y1)**2 ) * y1) )
    degree = int(180/m.pi)*theta
    return degree

def sendWarning():
    # Implement the function to send a warning (placeholder for now)
    print("Warning: Bad posture for an extended time!")

# Initialize pose estimation
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Placeholder colors
yellow = (0, 255, 255)
pink = (255, 0, 255)
green = (0, 255, 0)
red = (0, 0, 255)
light_green = (50, 255, 50)

# Default font
font = cv2.FONT_HERSHEY_SIMPLEX

good_frames = 0
bad_frames = 0

# Capture video from webcam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    # Capture frames
    success, image = cap.read()
    if not success:
        print("Null.Frames")
        break

    # Get fps and frame dimensions
    fps = cap.get(cv2.CAP_PROP_FPS)
    h, w = image.shape[:2]

    # Convert BGR to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Process the image
    keypoints = pose.process(image)

    # Convert RGB back to BGR
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Acquire landmark coordinates
    lm = keypoints.pose_landmarks
    lmPose = mp_pose.PoseLandmark
    # Left shoulder.
    l_shldr_x = int(lm.landmark[lmPose.LEFT_SHOULDER].x * w)
    l_shldr_y = int(lm.landmark[lmPose.LEFT_SHOULDER].y * h)

    # Right shoulder.
    r_shldr_x = int(lm.landmark[lmPose.RIGHT_SHOULDER].x * w)
    r_shldr_y = int(lm.landmark[lmPose.RIGHT_SHOULDER].y * h)

    # Left ear.
    l_ear_x = int(lm.landmark[lmPose.LEFT_EAR].x * w)
    l_ear_y = int(lm.landmark[lmPose.LEFT_EAR].y * h)

    # Left hip.
    l_hip_x = int(lm.landmark[lmPose.LEFT_HIP].x * w)
    l_hip_y = int(lm.landmark[lmPose.LEFT_HIP].y * h)


    # Check camera alignment
    offset = findDistance(l_shldr_x, l_shldr_y, r_shldr_x, r_shldr_y)
    if offset < 100:
        cv2.putText(image, str(int(offset)) + ' Aligned', (w - 150, 30), font, 0.9, green, 2)
    else:
        cv2.putText(image, str(int(offset)) + ' Not Aligned', (w - 150, 30), font, 0.9, red, 2)

    # Calculate angles.
    neck_inclination = findAngle(l_shldr_x, l_shldr_y, l_ear_x, l_ear_y)
    torso_inclination = findAngle(l_hip_x, l_hip_y, l_shldr_x, l_shldr_y)

    # Draw landmarks.
    cv2.circle(image, (l_shldr_x, l_shldr_y), 7, yellow, -1)
    cv2.circle(image, (l_ear_x, l_ear_y), 7, yellow, -1)

    # Let's take y - coordinate of P3 100px above x1,  for display elegance.
    # Although we are taking y = 0 while calculating angle between P1,P2,P3.
    cv2.circle(image, (l_shldr_x, l_shldr_y - 100), 7, yellow, -1)
    cv2.circle(image, (r_shldr_x, r_shldr_y), 7, pink, -1)
    cv2.circle(image, (l_hip_x, l_hip_y), 7, yellow, -1)

    # Similarly, here we are taking y - coordinate 100px above x1. Note that
    # you can take any value for y, not necessarily 100 or 200 pixels.
    cv2.circle(image, (l_hip_x, l_hip_y - 100), 7, yellow, -1)

    # Put text, Posture and angle inclination.
    # Text string for display.
    angle_text_string = 'Neck : ' + str(int(neck_inclination)) + '  Torso : ' + str(int(torso_inclination))

    # Determine whether good posture or bad posture.
    # The threshold angles have been set based on intuition.
    if neck_inclination < 40 and torso_inclination < 10:
        bad_frames = 0
        good_frames += 1

        cv2.putText(image, angle_text_string, (10, 30), font, 0.9, light_green, 2)
        cv2.putText(image, str(int(neck_inclination)), (l_shldr_x + 10, l_shldr_y), font, 0.9, light_green, 2)
        cv2.putText(image, str(int(torso_inclination)), (l_hip_x + 10, l_hip_y), font, 0.9, light_green, 2)

        # Join landmarks.
        cv2.line(image, (l_shldr_x, l_shldr_y), (l_ear_x, l_ear_y), green, 4)
        cv2.line(image, (l_shldr_x, l_shldr_y), (l_shldr_x, l_shldr_y - 100), green, 4)
        cv2.line(image, (l_hip_x, l_hip_y), (l_shldr_x, l_shldr_y), green, 4)
        cv2.line(image, (l_hip_x, l_hip_y), (l_hip_x, l_hip_y - 100), green, 4)

    else:
        good_frames = 0
        bad_frames += 1

        cv2.putText(image, angle_text_string, (10, 30), font, 0.9, red, 2)
        cv2.putText(image, str(int(neck_inclination)), (l_shldr_x + 10, l_shldr_y), font, 0.9, red, 2)
        cv2.putText(image, str(int(torso_inclination)), (l_hip_x + 10, l_hip_y), font, 0.9, red, 2)

        # Join landmarks.
        cv2.line(image, (l_shldr_x, l_shldr_y), (l_ear_x, l_ear_y), red, 4)
        cv2.line(image, (l_shldr_x, l_shldr_y), (l_shldr_x, l_shldr_y - 100), red, 4)
        cv2.line(image, (l_hip_x, l_hip_y), (l_shldr_x, l_shldr_y), red, 4)
        cv2.line(image, (l_hip_x, l_hip_y), (l_hip_x, l_hip_y - 100), red, 4)

    # Calculate the time of remaining in a particular posture.
    good_time = (1 / fps) * good_frames
    bad_time = (1 / fps) * bad_frames

    # Pose time.
    if good_time > 0:
        time_string_good = 'Good Posture Time : ' + str(round(good_time, 1)) + 's'
        cv2.putText(image, time_string_good, (10, h - 20), font, 0.9, green, 2)
    else:
        time_string_bad = 'Bad Posture Time : ' + str(round(bad_time, 1)) + 's'
        cv2.putText(image, time_string_bad, (10, h - 20), font, 0.9, red, 2)

    # If you stay in bad posture for more than 3 minutes (180s) send an alert.
    if bad_time > 180:
        sendWarning()

    # Display the processed frame
    cv2.imshow('Posture Detection', image)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
