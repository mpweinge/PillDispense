#include "Display.h"
#include "GlobalVariables.h"

int motorPins[] = {5, 6, 10, 11};
int count = 0;
int delayTime = 20;

int EyeSensorPin = 7;
int SensorCount = 0;

int MotorStep = 0;
int MotorSteps[] = {0,3,1,0,2,1,3,2};

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

void MotorStop()
{
  for(int ReverseCount = 0; ReverseCount < 6; ReverseCount++)
  {
    for(MotorStep; MotorStep >= 0; MotorStep--)
    {
      if(MotorStep%2 == 0)
      {
        digitalWrite(motorPins[MotorSteps[MotorStep]],HIGH);
      }
      else
      {
        digitalWrite(motorPins[MotorSteps[MotorStep]],LOW);
      }
      delay(delayTime);
    }
    MotorStep = 7;
  }
  digitalWrite(motorPins[0],LOW);
  digitalWrite(motorPins[1],LOW);
  digitalWrite(motorPins[2],LOW);
  digitalWrite(motorPins[3],LOW);
}


void MotorRotateLoop(int desiredPillCount) 
{
  SensorCount = 0;
  while ( SensorCount < desiredPillCount)
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

void MotorTestMode(int desiredPillCount) 
{
  MemTestRunning = 1;
  SensorCount = 0;
  PrintNumber(SensorCount);
  while (MemTestRunning == 1)
  {
    for(MotorStep = 0; MotorStep < 8; MotorStep++)
    {
      if(MotorStep%2 == 0)
      {
        digitalWrite(motorPins[MotorSteps[MotorStep]],HIGH);
      }
      else
      {
        digitalWrite(motorPins[MotorSteps[MotorStep]],LOW);
      }
      
      if(desiredPillCount - SensorCount > 3)
      {
        delay(delayTime);
      }
      else if(desiredPillCount - SensorCount == 3)
      {
        delay(delayTime*3);
      }
      else if(desiredPillCount - SensorCount == 2)
      {
        delay(delayTime*6);
      }
      else
      {
        delay(delayTime*12);
      }
      
      if(MemTestRunning == 0 || SensorCount >= desiredPillCount)
      {
          MemTestRunning = 0;
          MotorStop();
          return;  
      }
    }
  }
  MotorStop();     
}


