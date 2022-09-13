const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");

const getCompanyById = asyncHandler(async (req, resp) => { 
  try {
    const id = req.params.id;
    const CompanyList = await Company.findById(id);
    if (CompanyList) {
      resp.send({
        status: 200,
        success: "true",
        list: CompanyList,
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
});

const getCompany = asyncHandler(async (req, resp) => {
  try {
    const CompanyList = await Company.find().sort("-_id");
    resp.send({
      CompanyList,
      success: "true",
      status: 200,
    });
  } catch (err) {
    resp.send({
      error: err.message,
      status: 400,
      success: "false",
    });
  }
});

const deleteCompany = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const CompanyDeleted = await Company.findByIdAndDelete(id);
    if (CompanyDeleted) {
      resp.send({
        status: 200,
        message: "Company Deleted Successfully",
        success: true,
      });
    } else {
      resp.send({
        status: 400,
        message: "Company Not Found",
        success: "false",
      });
    }
  } catch (err) {
    resp.send({ 
      error: err.message,
    });
  }
});

const updateCompany = asyncHandler(async (req, resp) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const updateCompanyData = await Company.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (updateCompanyData) {
      resp.send({
        updateCompanyData,
        status: 200,
        success: "true",
        message: "Company Data Updated SuccessFully",
      });
    }
  } catch (err) {
    resp.send({
      success: "false",
      error: err.message,
      status: 400,
    });
  }
});

const addCompany = asyncHandler(async(req,res)=>{
    try {
        const body = req.body
        const newCompany = new Company(body)
        const saveCompany = await newCompany.save()
        res.send({
            message : 'Company saved successfully',
            success : true,
            status : 201
        })
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            success : false,
            error : error.message,
            status : 400
        })
    }
})

module.exports = {
  getCompany,
  getCompanyById,
  deleteCompany,
  updateCompany,
  addCompany
};
