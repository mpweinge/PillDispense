#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>
#include <SoftwareSerial.h>

#include "Display.h"
#include "Motor.h"

//For help see http://scuola.arduino.cc/courses/lessons/view/zzdeJ3m
//And http://arduino.cc/en/Tutorial/Bridge

YunServer server;
String msg;

int led = 13;
int state = 0;

unsigned long millisTime = 0;

void GreenButton()
{
  if ((millis() - millisTime) < 500)
    return;
    
  millisTime = millis();
  PrintNumber(state);
  state++;
  
  OrderMade(10);
}

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
  
  attachInterrupt(0, GreenButton, RISING);
}

void loop() {
  // put your main code here, to run repeatedly:
  YunClient client = server.accept();

  if (client) 
  {
    //String command = client.readStringUntil('/');
   // if (command == "HIGH") {
     client.println("COMING FROM ARDUINO");
     /*client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connnection: close");
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html><body>HELLO</body></html>");*/
   // }
     Serial.print("RECEIVED CLIENT ACTION");
     state++;
     OrderMade(10);
  
     delay(10000);
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
}

void OrderMade(int Number)
{
  MotorRotateLoop(Number);
}
