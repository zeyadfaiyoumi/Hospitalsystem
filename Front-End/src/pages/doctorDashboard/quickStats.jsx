import React from "react";
import { motion } from "framer-motion";
import { Users, Brain, Calendar, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QuickStats = ({ appointments }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
  >
    {[
      {
        title: "Total Patients",
        value: 10,
        icon: Users,
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Years of Experience",
        value: 10,
        icon: Brain,
        color: "bg-green-100 text-green-600",
      },
      {
        title: "Appointments Today",
        value: 2,
        icon: Calendar,
        color: "bg-yellow-100 text-yellow-600",
      },
      {
        title: "Patient Satisfaction",
        value: "98%",
        icon: Smile,
        color: "bg-purple-100 text-purple-600",
      },
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card
          className={`${stat.color} border-none hover:shadow-lg transition-shadow duration-300`}
        >
          <CardContent className="flex items-center p-4">
            <stat.icon className="h-8 w-8 mr-4" />
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </motion.div>
);

export default QuickStats;
