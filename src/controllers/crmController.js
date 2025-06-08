import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModels";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = async (req, res) => {
  let newContact = new Contact(req.body);
  try {
    const contact = await newContact.save();
    console.log(res);
    res.status(201).json(contact); // Optional return the result in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Error saving contact" }); // Handle errors
  }
};
