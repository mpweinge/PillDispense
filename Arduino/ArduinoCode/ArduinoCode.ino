#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>
#include <SoftwareSerial.h>

#include "Display.h"
#include "Motor.h"
#include "GlobalVariables.h"

//For help see http://scuola.arduino.cc/courses/lessons/view/zzdeJ3m
//And http://arduino.cc/en/Tutorial/Bridge

YunServer server;
String msg;

int led = 13;
int state = 0;

unsigned long millisTime_Green = 0;
unsigned long millisTime_Red = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Bridge.begin();
  server.listenOnLocalhost();
  server.begin();
  
  pinMode(led, OUTPUT);
  
  digitalWrite(led, LOW);
  
  MotorSetup();
  DisplaySetup();
  
  attachInterrupt(1, GreenButton, RISING);
  attachInterrupt(0, RedButton, RISING);
  //clearDisplay();
}

void GreenButton()
{
  if ((millis() - millisTime_Green) < 500)
    return;
    
  millisTime_Green = millis();
  MemTestRunning = 1;
  //PrintNumber(1000);
  /*PrintNumber(state);
  state++;
  
  OrderMade(10);*/
}

void RedButton()
{
  if ((millis() - millisTime_Red) < 500)
    return;
    
  millisTime_Red = millis();
  MemTestRunning = 0;
  //PrintNumber(1001);
  /*PrintNumber(state);
  state++;
  
  OrderMade(10);*/
}

void loop() {
  // put your main code here, to run repeatedly:
  YunClient client = server.accept();

  if (client) 
  {
     String command = client.readStringUntil('/');
     /*Serial.print(command);
     client.println("COMING FROM ARDUINO");
     Serial.print("RECEIVED CLIENT ACTION");*/
     state++;
     
     OrderMade(command.toInt());
  
     delay(2000);
     if (state == 1)
     {
       digitalWrite(led, HIGH);
     }
     else
     {
       state = 0;
       digitalWrite(led, LOW);
     }
    client.stop();
  }
  
  if(MemTestRunning == 1)
  {
    MotorTestMode(10);
  }
  
}

void OrderMade(int Number)
{
  MotorTestMode(Number);
}
