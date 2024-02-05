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
}

void loop() {
  float temperature = thermocouple.readCelsius();
  if (isnan(temperature)) {
    Serial.println("Error reading thermocouple.");
  } else {
    Serial.print("Thermocouple Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
  }

  int alcoholLevel = analogRead(MQ3_ANALOG_PIN);
  bool presenceOfAlcohol = digitalRead(MQ3_DIGITAL_PIN);

  Serial.print("Alcohol Level (Analog): ");
  Serial.println(alcoholLevel);
  
  Serial.print("Presence of Alcohol (Digital): ");
  Serial.println(presenceOfAlcohol);

  delay(1000);
}
