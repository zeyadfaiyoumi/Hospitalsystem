import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PlusCircle, X, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import eyeImage from "../../assets/eye.webp";
import { Label } from "@/components/ui/label";
import { format, isEqual } from "date-fns";
import axios from "axios";
const FreeDateSelector = ({ freeDates, onFreeDatesChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const addFreeDate = async () => {
    if (selectedDate) {
      const newFreeDate = {
        date: selectedDate,
        startTime,
        endTime,
      };

      // Check for overlapping time slots
      const isOverlapping = freeDates.some(
        existingDate =>
          isEqual(existingDate.date, selectedDate) &&
          ((startTime >= existingDate.startTime &&
            startTime < existingDate.endTime) ||
            (endTime > existingDate.startTime &&
              endTime <= existingDate.endTime) ||
            (startTime <= existingDate.startTime &&
              endTime >= existingDate.endTime))
      );

      if (isOverlapping) {
        alert(
          "This time slot overlaps with an existing one. Please choose a different time."
        );
        return;
      }

      if (startTime >= endTime) {
        alert("End time must be after start time.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/staff/addStaffSchedule",
        {
          startTime: format(selectedDate, "yyyy-MM-dd") + "T" + startTime,
          endTime: format(selectedDate, "yyyy-MM-dd") + "T" + endTime,
        },
        { withCredentials: true }
      );
      // Add the new free date to the existing array
      const updatedFreeDates = [
        ...freeDates,
        { ...newFreeDate, id: response.data[0].schedule_id },
      ];

      onFreeDatesChange(updatedFreeDates);
      setStartTime("09:00");
      setEndTime("17:00");
    }
  };

  const removeFreeDate = async id => {
    await axios.delete(
      `http://localhost:5000/api/staff/deleteStaffSchedule/${id}`
    );
    const newFreeDates = freeDates.filter(d => d.id !== id);
    onFreeDatesChange(newFreeDates);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-teal-700 flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Set Free Session Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger id="startTime">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger id="endTime">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={addFreeDate}
                disabled={!selectedDate}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Free Date
              </Button>
            </div>
            <div className="space-y-2">
              {freeDates
                .sort(
                  (a, b) =>
                    a.date - b.date || a.startTime.localeCompare(b.startTime)
                )
                .map((freeDate, index) => (
                  <Badge
                    key={`${freeDate.date.toISOString()}-${
                      freeDate.startTime
                    }-${freeDate.endTime}`}
                    variant="secondary"
                    className="flex justify-between items-center p-2 w-full"
                  >
                    <span>{format(freeDate.date, "MMM dd, yyyy")}</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {freeDate.startTime} - {freeDate.endTime}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFreeDate(freeDate.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </Badge>
                ))}
            </div>
          </div>
          <div className="w-1/2 pl-4 flex items-center justify-center">
            <img src={eyeImage} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeDateSelector;
