
import HttpError from '../helpers/HttpError.js';
import Contact from '../models/contact.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await Contact.findById(contactId);

    if (!oneContact) throw HttpError(404);

    res.status(200).send(oneContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) throw HttpError(404);

    res.status(200).send(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const addContact = await Contact.create(req.body);

    return res.status(201).send(addContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const contact = await changeContact(id, { name, email, phone });
    if (!contact) {
      throw HttpError(404, "id not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
};