import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ReplyModal = ({ contact, isOpen, onClose }) => {
  const [replyMessage, setReplyMessage] = useState("");

  const handleSave = async () => {
 
    try {
      // إرسال الطلب إلى الـ API باستخدام async/await وتمرير الـ id من الـ contact
      const response = await axios.put(
        `http://localhost:5000/api/admin/ReplyContactMessages/${contact.message_id}`, // إضافة الـ id
        { replyMessage: replyMessage } // إرسال الرسالة
      );
      if (response.data) {
        await Swal.fire({
            title: "Success!",
            text: "The response has been sent successfully",
            icon: "success",
            confirmButtonText: "OK",
        });

        setReplyMessage("");
        onClose();
    }
      onClose(); // إغلاق النافذة بعد نجاح الإرسال
    } catch (error) {
 
    }
  };

  if (!isOpen) return null; // إخفاء الكومبوننت إذا لم يكن مفتوحًا

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#232323" }}>
          Reply to {contact.username}
        </h2>
        <textarea
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          placeholder="Write your reply..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f7b6f]"
          rows="4"
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#232323" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#1f7b6f" }}
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
