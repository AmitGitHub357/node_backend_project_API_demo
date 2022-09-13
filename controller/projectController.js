const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Project = require("../models/ProjectModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");

const getProjectById = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const ProjectList = await Project.findById(id).sort('-id').populate('companyId');
    if (ProjectList) {
      resp.send({
        status: 200,
        success: "true",
        list: ProjectList,
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
});

// const getProjectByCompanyName = asyncHandler (async(req,resp) => 
// {
//   const companyName = req.query.name
//   const projectList = await Project.find({ companyName }).populate('companyId')
  // resp.send({
  //   projectList
  // })
// })

const getProjectByCompanyName = asyncHandler(async (req, resp) => {
const companyName = req.query.name

var updatedProjectsList = []
try {
  const projectList = await Project.find({ companyName }).populate('companyId')

  // for(let i = 0;i < projectList.length; i++)
  // {
  //     if(projectList[i].companyId.companyName === companyName)
  //     {
  //       updatedProjectsList.push(projectList[i])
  //     }
  // }
  
  resp.send({
    projectList,
    success : true,
      status : 200
  })

} catch (error) 
{
  resp.send({
      message : 'Something went wrong,please try again',
      success : false,
      error : error.message,
      status : 400
  })
}
})

const getProject = asyncHandler(async (req, resp) => {
  try {
    const ProjectList = await Project.find().sort("-_id");
    resp.send({
      ProjectList,
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

const deleteProject = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const ProjectDeleted = await Project.findByIdAndDelete(id);
    if (ProjectDeleted) {
      resp.send({
        status: 200,
        message: "Project Deleted Successfully",
        success: true,
      });
    } else {
      resp.send({
        status: 400,
        message: "Project Not Found",
        success: "false",
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
});

const updateProject = asyncHandler(async (req, resp) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const updateProjectData = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (updateProjectData) {
      resp.send({
        updateProjectData,
        status: 200,
        success: "true",
        message: "Project Data Updated SuccessFully",
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

const addProject = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const newProject = new Project(body);
    const saveProject = await newProject.save();
    res.send({
      message: "Project saved successfully",
      success: true,
      status: 201,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong,please try again",
      success: false,
      error: error.message,
      status: 400,
    });
  }
});

module.exports = {
  getProject,
  getProjectById,
  deleteProject,
  updateProject,
  addProject,
  getProjectByCompanyName
  // getProjectByCompanyName,
};
