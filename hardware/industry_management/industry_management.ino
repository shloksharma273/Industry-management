#include <Wire.h>
#include <Adafruit_MAX31855.h>

#define THERMOCOUPLE_CLK 3
#define THERMOCOUPLE_CS 4
#define THERMOCOUPLE_DO 5

Adafruit_MAX31855 thermocouple(THERMOCOUPLE_CLK, THERMOCOUPLE_CS, THERMOCOUPLE_DO);

#define MQ3_ANALOG_PIN A0
#define MQ3_DIGITAL_PIN 2

void setup() {
  Serial.begin(9600);
  pinMode(MQ3_DIGITAL_PIN, INPUT);
  pinMode(13, OUTPUT);
}

void blinkLED() {
  // Blink LED
  digitalWrite(13, HIGH);
  delay(500); // Wait for 500 milliseconds
  digitalWrite(13, LOW);
  delay(500); // Wait for 500 milliseconds
}

void loop() {
  float temperature = thermocouple.readCelsius();
  if (isnan(temperature)) {
    Serial.println("Error reading thermocouple.");
  } else if(temperature > 80) {
//    Serial.print("Critical Temperature Exceeded!!!! ");
    Serial.println(temperature);
//    Serial.println(" °C");
    blinkLED();
  } else {
//    Serial.print("Current Temperature: ");
    Serial.println(temperature);
//    Serial.println(" °C");
  }

  int ammoniaLevel = analogRead(MQ3_ANALOG_PIN);
  bool presenceOfAmmonia = digitalRead(MQ3_DIGITAL_PIN);
  if ( ammoniaLevel> 50){
//    Serial.print(" Critical Ammonia Level Exceeded!!!!");
//    Serial.print("Ammonia Level (Analog): ");
    Serial.println(ammoniaLevel);
    
//    Serial.print("Presence of Ammonia (Digital): ");
//    Serial.println(presenceOfAmmonia);
    blinkLED();
  }else {
//    Serial.print("Ammonia Level (Analog): ");
    Serial.println(ammoniaLevel);
    
//    Serial.print("Presence of Ammonia (Digital): ");
//    Serial.println(presenceOfAmmonia);
  }
  delay(1000);
}
