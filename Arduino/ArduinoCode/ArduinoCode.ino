#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>

//For help see http://scuola.arduino.cc/courses/lessons/view/zzdeJ3m
//And http://arduino.cc/en/Tutorial/Bridge

YunServer server;
String msg;

int led = 13;
int state = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Bridge.begin();
  server.listenOnLocalhost();
  server.begin();
  
  pinMode(led, OUTPUT);
  
  digitalWrite(led, LOW);
}

void loop() {
  // put your main code here, to run repeatedly:
  YunClient client = server.accept();

  if (client) {
    //String command = client.readStringUntil('/');
   // if (command == "HIGH") {
      client.print("COMING FROM ARDUINO");
   // }
     state++;
     if (state == 1)
       digitalWrite(led, HIGH);
     else
     {
       state = 0;
       digitalWrite(led, LOW);
     }
    client.stop();
  }
}
