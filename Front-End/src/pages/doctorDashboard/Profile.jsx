import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Edit2,
  Save,
  Activity,
  CalendarIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import axios from "axios";
import FreeDateSelector from "./FreeDateSelector";
import { parseISO } from "date-fns";

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState(profile);
  const [freeDates, setFreeDates] = useState([]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Save profile changes
      await axios.put(
        "http://localhost:5000/api/auth/updateUser",
        editedProfile,
        { withCredentials: true }
      );

      // Save free dates
      // await axios.post(
      //   "http://localhost:5000/api/auth/updateFreeDates",
      //   { freeDates },
      //   { withCredentials: true }
      // );

      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleChange = e => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleFreeDatesChange = newFreeDates => {
    setFreeDates(newFreeDates);
  };

  useEffect(() => {
    (async () => {
      try {
        const doctorData = await axios.get(
          "http://localhost:5000/api/auth/getUserById",
          { withCredentials: true }
        );
        setProfile(doctorData.data.user);
        setEditedProfile(doctorData.data.user);

        // Fetch free dates
        const freeDatesResponse = await axios.get(
          "http://localhost:5000/api/staff/getStaffSchedule",
          { withCredentials: true }
        );
        console.log(freeDatesResponse.data);
        const parsedFreeDates = freeDatesResponse.data.map(slot => ({
          date: parseISO(slot.start_time),
          startTime: new Date(slot.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: new Date(slot.end_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          id: slot.schedule_id,
        }));

        setFreeDates(parsedFreeDates);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg mb-6">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl text-teal-700 flex items-center">
            <User className="mr-2 h-6 w-6" />
            Doctor Profile
          </CardTitle>
          <CardDescription>
            View and manage your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/api/placeholder/128/128" alt={profile.name} />
              <AvatarFallback className="bg-teal-600 text-white text-3xl">
                {profile.name
                  ?.split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-teal-700">
                {profile.name}
              </h2>
              <p className="text-lg text-gray-600">{profile.specialty}</p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Activity className="h-5 w-5 text-teal-600 mr-2" />
                <span className="text-sm text-gray-600">
                  {profile.patientsServed || 10} patients served
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-teal-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-teal-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-teal-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={isEditing ? editedProfile.password : "********"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
              >
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
              >
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl text-teal-700 flex items-center">
            <CalendarIcon className="mr-2 h-6 w-6" />
            Free Session Dates
          </CardTitle>
          <CardDescription>
            Set your available dates for free sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <FreeDateSelector
            freeDates={freeDates}
            onFreeDatesChange={handleFreeDatesChange}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileTab;
