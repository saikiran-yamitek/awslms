// src/components/admin/Courses.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  listCourses,
  deleteCourse
} from '../../services/adminApi';

import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiBook,
  FiClock,
  FiActivity
} from 'react-icons/fi';

import './Courses.css';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* fetch once */
  useEffect(() => {
    (async () => {
      try {
        const data = await listCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter(c => c._id !== id));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="page-title-container">
          <FiBook className="page-icon" />
          <h1 className="page-titlepo">Courses Management</h1>
        </div>
        <p className="page-subtitle">Manage and organize your course content</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon published">
            <FiActivity />
          </div>
          <div className="stat-content">
            <h3>{courses.filter(c => (c.status || "").toLowerCase().trim() === "published").length}</h3>
            <p>Published</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon draft">
            <FiClock />
          </div>
          <div className="stat-content">
            
<h3>{courses.filter(c => (c.status || "").toLowerCase().trim() === "draft").length}</h3>
            <p>Draft</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FiBook />
          </div>
          <div className="stat-content">
            <h3>{courses.length}</h3>
            <p>Total Courses</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="courses-toolbar">
        <div className="toolbar-left">
          <h2 className="section-title">All Courses</h2>
        </div>
        <div className="toolbar-right">
          <Link to="/admin/courses/new" className="new-btn">
            <FiPlus />
            <span>New Course</span>
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="courses-card">
        {courses.length === 0 ? (
          <div className="empty-state">
            <FiBook className="empty-state-icon" />
            <h3>No courses found</h3>
            <p>Get started by creating your first course</p>
            <Link to="/admin/courses/new" className="empty-state-btn">
              <FiPlus />
              Create Course
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, index) => (
                  <tr key={c._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <td className="course-title">
                      <div className="course-info">
                        <h4>{c.title}</h4>
                        <span className="course-meta">Course ID: {c._id.slice(-6)}</span>
                      </div>
                    </td>
                    <td className="duration">
                      <div className="duration-badge">
                        <FiClock />
                        {c.overallDuration} min
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="actions">
                      <Link 
                        to={`/admin/courses/${c._id}`} 
                        className="action-btn edit-btn"
                        title="Edit Course"
                      >
                        <FiEdit2 />
                      </Link>
                      <button 
                        onClick={() => handleDelete(c._id)} 
                        className="action-btn delete-btn"
                        title="Delete Course"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
