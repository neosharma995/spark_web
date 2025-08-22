"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { SectorDataContext } from "@/context/apiContext";

const FormSection = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.pagesDataApi?.find(
    (page) => page.slug === "contact-us"
  )?.acf;

  // State for form input values, including phone number
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("yourname", formData.name);
    formDataToSend.append("youremail", formData.email);
    formDataToSend.append("yournumber", formData.phone);
    formDataToSend.append("yourmessage", formData.message);
    formDataToSend.append("_wpcf7_unit_tag", 289);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/contact-form-7/v1/contact-forms/289/feedback`,
        {
          method: "POST",
          body: formDataToSend, // Send FormData object
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="form_section">
        <div className="inner-section">
          <div className="left-side">
            <div className="left-inner">
              <div className="page_title">
                <h1>{mainData?.page_title}</h1>
              </div>
              <div className="form-heading">
                <h3>Make an Enquiry</h3>
              </div>
              <form onSubmit={handleSubmit} className="contact-us-form">
                <div className="form-inner-section">
                  <div className="form-control">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}  required/>
                  </div>
                  <div className="form-control">
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-control">
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required/>
                  </div>
                  <div className="form-control">
                    <textarea name="message"  placeholder="Your Message" value={formData.message}  onChange={handleChange} required ></textarea>
                  </div>
                </div>
                <button className="btn" type="submit"> Send Message </button>
              </form>
            </div>
          </div>
          <div className="right-section">
            <Image
              src={mainData?.main_image}
              alt="Main Image"
              layout="responsive"
              width={100}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
