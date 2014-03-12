#include "Display.h"

int motorPins[] = {5, 6, 10, 11};
int count = 0;
int delayTime = 20;

int EyeSensorPin = 7;
int SensorCount = 0;

void TripSensor()
{
  SensorCount++;
  Serial.write("Receiving EyeSensor Trip");
  Serial.write(SensorCount);
  PrintNumber(SensorCount);
}

void MotorSetup() 
{
  // put your setup code here, to run once:
  for(count = 0; count < 4; count++)
  {
    pinMode(motorPins[count], OUTPUT);
  }
  digitalWrite(motorPins[0],LOW);
  digitalWrite(motorPins[1],LOW);
  digitalWrite(motorPins[2],LOW);
  digitalWrite(motorPins[3],LOW);
  
  Serial.begin(9600);
  
  pinMode(EyeSensorPin, INPUT);
  
  attachInterrupt(4, TripSensor, FALLING);
}

void MotorRotateLoop(int desiredPillCount) 
{
  SensorCount = 0;
  while ( SensorCount < desiredPillCount )
  {
    digitalWrite(motorPins[0],HIGH);
    delay(delayTime);
    
    digitalWrite(motorPins[3],LOW);
    delay(delayTime);
      
    digitalWrite(motorPins[1],HIGH);
    delay(delayTime);
    
    digitalWrite(motorPins[0],LOW);
    delay(delayTime);
    
    digitalWrite(motorPins[2],HIGH);
    delay(delayTime);
    
    digitalWrite(motorPins[1],LOW);
    delay(delayTime);
    
    digitalWrite(motorPins[3],HIGH);
    delay(delayTime);
    
    digitalWrite(motorPins[2],LOW);
    delay(delayTime);
  }
  
  //Need to turn off motors
}
