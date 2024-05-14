import HttpError from '../helpers/HttpError.js';
import contactsService from '../services/contactsServices.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const allContacts = await contactsService.listContacts();
    res.status(200).send(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneContact = await contactsService.getContactById(id);

    if (!oneContact) {
      throw HttpError(404);
    }
    res.status(200).send(oneContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);

    if (!deletedContact) {
      throw HttpError(404);
    }
    res.status(200).send(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const value = req.body;
    const addContact = await contactsService.addContact(value);

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