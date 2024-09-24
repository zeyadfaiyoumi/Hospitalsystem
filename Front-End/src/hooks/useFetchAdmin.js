import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../features/Admin/AdminSlice"; // استدعاء fetchAdmin
import { useNavigate } from "react-router-dom";

const useFetchAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admins = useSelector((state) => state.Admin.Admin); // جلب بيانات الأدمن من الـ Redux
  const adminStatus = useSelector((state) => state.Admin.status); // جلب حالة الـ fetch
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!admins) {
      dispatch(fetchAdmin()); // استدعاء fetchAdmin إذا لم تكن البيانات موجودة
    }
  }, [dispatch, admins]);

  useEffect(() => {
    if (adminStatus === "idle") {
      dispatch(fetchAdmin()); // استدعاء fetchAdmin إذا كانت الحالة idle
    }
  }, [dispatch, adminStatus]);

  useEffect(() => {
    if (adminStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [adminStatus]);

  useEffect(() => {
    if (adminStatus === "failed") {
      navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا فشل التحميل
    }
  }, [adminStatus, navigate]);

  return { admins, isLoading, adminStatus }; // إرجاع البيانات اللازمة للاستخدام في المكونات
};

export default useFetchAdmin;
