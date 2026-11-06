import { courses } from './data/courses'
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom'
import './App.css'


function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        Course Catalog
      </NavLink>

      <div className="nav-links">
        <NavLink to="/category/Beginner">
          Beginner
        </NavLink>

        <NavLink to="/category/Intermediate">
          Intermediate
        </NavLink>
      </div>
    </nav>
  )
}


function CourseCard({ course }) {
  return (
    <div className="course-card">
      <span className="course-category">{course.category}</span>

      <h2>{course.title}</h2>

      <p>{course.description}</p>

      <p>Duration: {course.duration}</p>

      <Link to={`/courses/${course.slug}`} className="course-link">
        View Course →
      </Link>
    </div>
  )
}
function CourseDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const course = courses.find((item) => item.slug === slug)

  if (!course) {
    return <h1>Course Not Found</h1>
  }
  
  return (
    <main>
      <span className="course-category">{course.category}</span>

      <h1>{course.title}</h1>

      <p>{course.description}</p>

      <p>Duration: {course.duration}</p>

      <h2>What You Will Learn</h2>

      <ul>
        {course.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      <button onClick={() => navigate('/')}>
  Back to Courses
</button>
    </main>
  )
}

function CategoryPage() {
  const { category } = useParams()

  const filteredCourses = courses.filter(
    (course) => course.category.toLowerCase() === category.toLowerCase()
  )

  return (
    <main>
      <h1>{category} Courses</h1>

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  )
}



function HomePage() {
  return (
    <main>
      <h1>Explore Our Courses</h1>
      <p>Explore our available courses and start learning today.</p>

      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}


export default App