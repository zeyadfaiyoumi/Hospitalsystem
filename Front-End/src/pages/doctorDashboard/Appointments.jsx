import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageCircle, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    prescription: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/getallAppointmentswithDoctorsAndUsers",
        { withCredentials: true }
      );
      setAppointments(
        response.data.map(apt => ({
          id: apt.appointment_id,
          patient: apt.name,
          patient_id: apt.patient_id,
          doctor_id: apt.doctor_id,
          appointment_date: apt.appointment_date,
          status: apt.status,
          notes: apt.notes,
        }))
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleReplyClick = appointment => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedAppointment(null);
    setFormData({ diagnosis: "", treatment: "", prescription: "" });
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log("Selected appointment:", {
        ...selectedAppointment,
        ...formData,
      });
      await axios.post(
        "http://localhost:5000/api/medical-records/add-medical-record",
        {
          patient_id: selectedAppointment.patient_id,
          doctor_id: selectedAppointment.doctor_id,
          date: selectedAppointment.appointment_date,
          ...formData,
        }
      );
      await axios.post(
        "http://localhost:5000/api/users/change-appointment-status",
        {
          appointment_id: selectedAppointment.id,
          status: "completed",
        }
      );
      handleCloseForm();
      // Optionally, refresh appointments or update the local state
      fetchAppointments();
    } catch (error) {
      console.error("Error submitting medical record:", error);
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case "scheduled":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-teal-700 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Appointments
          </CardTitle>
          <CardDescription>Manage your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-teal-700">Patient</TableHead>
                <TableHead className="text-teal-700">Date and Time</TableHead>
                <TableHead className="text-teal-700">Status</TableHead>
                <TableHead className="text-teal-700">Notes</TableHead>
                <TableHead className="text-teal-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {appointments.map(apt => (
                  <motion.tr
                    key={apt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <TableCell>{apt.patient}</TableCell>
                    <TableCell>
                      {new Date(apt.appointment_date).toLocaleString()}
                    </TableCell>
                    <TableCell className={getStatusColor(apt.status)}>
                      {apt.status}
                    </TableCell>
                    <TableCell>{apt.notes}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-400 hover:text-blue-500 hover:bg-blue-50"
                        onClick={() => handleReplyClick(apt)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Add Medical Record</span>
                <Button variant="ghost" size="icon" onClick={handleCloseForm}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="treatment">Treatment</Label>
                  <Input
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentsTab;
