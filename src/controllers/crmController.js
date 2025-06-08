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

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getContactWithId = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    res.json(contact);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true },
      (req, contact)
    );
    res.json(contact);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.contactId });
    res.json({ message: "Successfully deleted contact" });
  } catch (err) {
    res.status(500).send(err);
  }
};
