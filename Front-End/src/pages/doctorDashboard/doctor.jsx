import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import QuickStats from "./quickStats";
import AppointmentsTab from "./Appointments";
import PatientRecordsTab from "./PatientRecords";
import ProfileTab from "./Profile";
import LoadingScreen from "./LoadingScreen";
import AppointmentModal from "./AppointmentModal";
const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      // setAppointments([
      //   {
      //     id: 1,
      //     patient: "John Doe",
      //     date: "2024-09-20",
      //     time: "09:00 AM",
      //     reason: "Annual checkup",
      //     status: "Confirmed",
      //   },
      //   {
      //     id: 2,
      //     patient: "Jane Smith",
      //     date: "2024-09-20",
      //     time: "10:30 AM",
      //     reason: "Follow-up",
      //     status: "Pending",
      //   },
      //   {
      //     id: 3,
      //     patient: "Bob Johnson",
      //     date: "2024-09-21",
      //     time: "02:00 PM",
      //     reason: "New patient consultation",
      //     status: "Confirmed",
      //   },
      // ]);

      // setPatients([
      //   {
      //     id: 1,
      //     name: "John Doe",
      //     age: 45,
      //     lastVisit: "2024-03-15",
      //     condition: "Hypertension",
      //   },
      //   {
      //     id: 2,
      //     name: "Jane Smith",
      //     age: 32,
      //     lastVisit: "2024-04-02",
      //     condition: "Asthma",
      //   },
      //   {
      //     id: 3,
      //     name: "Bob Johnson",
      //     age: 58,
      //     lastVisit: "2024-02-28",
      //     condition: "Diabetes",
      //   },
      // ]);

      // setProfile({
      //   name: "Dr. Sarah Williams",
      //   specialty: "General Practitioner",
      //   email: "sarah.williams@example.com",
      //   phone: "+1 (555) 123-4567",
      //   patientsServed: 1500,
      //   yearsOfExperience: 12,
      // });

      setLoading(false);
    }, 2000); // Simulate 2 second loading time
  }, []);

  const handleSaveAppointment = () => {
    // Implement save logic here
    setSelectedAppointment(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-teal-800 flex items-center">
          <Heart className="mr-2 h-8 w-8 text-teal-600" />
          MediConnect Dashboard
        </h1>
      </motion.div>

      <QuickStats />

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-teal-50 rounded-lg p-1 mb-4">
          <TabsTrigger
            value="appointments"
            className="text-teal-700 data-[state=active]:bg-white rounded-md transition-all duration-200"
          >
            Appointments
          </TabsTrigger>
          <TabsTrigger
            value="patient-records"
            className="text-teal-700 data-[state=active]:bg-white rounded-md transition-all duration-200"
          >
            Patient Records
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="text-teal-700 data-[state=active]:bg-white rounded-md transition-all duration-200"
          >
            Profile
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="appointments">
            <AppointmentsTab setSelectedAppointment={setSelectedAppointment} />
          </TabsContent>
          <TabsContent value="patient-records">
            <PatientRecordsTab />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      {selectedAppointment && (
        <AppointmentModal
          onClose={() => setSelectedAppointment(null)}
          onSave={handleSaveAppointment}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
