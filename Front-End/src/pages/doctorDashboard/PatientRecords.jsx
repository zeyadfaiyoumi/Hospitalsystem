import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";

const PatientRecordsTab = () => {
  const [patients, setPatients] = useState([]);
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/medical-records/get-medical-records",
          { withCredentials: true }
        );

        // Group the records by patient
        const groupedRecords = response.data.reduce((acc, record) => {
          if (!acc[record.patient_id]) {
            acc[record.patient_id] = {
              id: record.patient_id,
              name: record.name,
              records: [],
            };
          }
          acc[record.patient_id].records.push({
            record_id: record.record_id,
            patient_id: record.patient_id,
            doctor_id: record.doctor_id,
            date: record.date,
            diagnosis: record.diagnosis,
            treatment: record.treatment,
            prescription: record.prescription,
          });
          return acc;
        }, {});

        // Convert the grouped records object to an array
        const formattedPatients = Object.values(groupedRecords);

        setPatients(formattedPatients);
      } catch (error) {
        console.error("Error fetching medical records:", error);
      }
    };

    fetchMedicalRecords();
  }, []);

  const togglePatientRecords = patientId => {
    setExpandedPatient(expandedPatient === patientId ? null : patientId);
  };

  const handleEditRecord = record => {
    setEditingRecord({ ...record });
    setIsEditDialogOpen(true);
  };

  const handleDeleteRecord = async (patientId, recordId) => {
    await axios.delete(
      `http://localhost:5000/api/medical-records/delete-medical-record/${recordId}`
    );
    setPatients(
      patients.map(patient => {
        if (patient.id === patientId) {
          return {
            ...patient,
            records: patient.records.filter(
              record => record.record_id !== recordId
            ),
          };
        }
        return patient;
      })
    );
  };

  const handleSaveEdit = async () => {
    console.log(editingRecord);
    await axios.put(
      "http://localhost:5000/api/medical-records/edit-medical-record",
      editingRecord
    );
    setPatients(
      patients.map(patient => {
        if (patient.id === editingRecord.patient_id) {
          return {
            ...patient,
            records: patient.records.map(record =>
              record.record_id === editingRecord.record_id
                ? editingRecord
                : record
            ),
          };
        }
        return patient;
      })
    );
    setIsEditDialogOpen(false);
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
            <Users className="mr-2 h-5 w-5" />
            Patient Records
          </CardTitle>
          <CardDescription>
            Manage patient records and medical history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-teal-700">Name</TableHead>
                <TableHead className="text-teal-700 text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {patients.map(patient => (
                  <React.Fragment key={patient.id}>
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <TableCell>{patient.name}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                          onClick={() => togglePatientRecords(patient.id)}
                        >
                          {expandedPatient === patient.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </motion.tr>
                    {expandedPatient === patient.id && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <TableCell colSpan={2}>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-teal-700">
                                  Date
                                </TableHead>
                                <TableHead className="text-teal-700">
                                  Diagnosis
                                </TableHead>
                                <TableHead className="text-teal-700">
                                  Treatment
                                </TableHead>
                                <TableHead className="text-teal-700">
                                  Prescription
                                </TableHead>
                                <TableHead className="text-teal-700">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {patient.records.map(record => (
                                <TableRow key={record.record_id}>
                                  <TableCell>{record.date}</TableCell>
                                  <TableCell>{record.diagnosis}</TableCell>
                                  <TableCell>{record.treatment}</TableCell>
                                  <TableCell>{record.prescription}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                                      onClick={() => handleEditRecord(record)}
                                    >
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-400 hover:text-red-500 hover:bg-red-50"
                                      onClick={() =>
                                        handleDeleteRecord(
                                          patient.id,
                                          record.record_id
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medical Record</DialogTitle>
          </DialogHeader>
          {editingRecord && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="diagnosis" className="text-right">
                    Diagnosis
                  </Label>
                  <Input
                    id="diagnosis"
                    value={editingRecord.diagnosis}
                    onChange={e =>
                      setEditingRecord({
                        ...editingRecord,
                        diagnosis: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treatment" className="text-right">
                    Treatment
                  </Label>
                  <Input
                    id="treatment"
                    value={editingRecord.treatment}
                    onChange={e =>
                      setEditingRecord({
                        ...editingRecord,
                        treatment: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prescription" className="text-right">
                    Prescription
                  </Label>
                  <Input
                    id="prescription"
                    value={editingRecord.prescription}
                    onChange={e =>
                      setEditingRecord({
                        ...editingRecord,
                        prescription: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveEdit}>Save changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default PatientRecordsTab;
