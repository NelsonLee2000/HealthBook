import Layout from "../components/layout";

const Home = ({ name }) => {
  return (
    <Layout name={name}>
      <div class="d-flex flex-column align-items-center">
        <header class="my-4">
          <h1>Welcome to HealthBook!</h1>
        </header>

        <section class="w-50">
          <h2>Take Control of Your Health</h2>

          <p>
            Traditionally, your medical history has been scattered across
            different clinics, hospitals, and healthcare facilities. HealthBook
            is here to change that.
          </p>

          <h2 class="mt-4">Your Health, Your records</h2>

          <p>
            In a world where medical information is often controlled by
            providers, HealthBook empowers you to take charge of your health
            journey. No longer will you rely solely on the providers to keep
            track of your history - now, you're in control.
          </p>

          <h2 class="mt-4">Seamlessly Organize Your Health Data</h2>

          <p>
            From provider phone numbers and clinic addresses to prescription
            medicine and post-appointment notes, HealthBook simplifies the
            complex task of managing your health information. Easily organize,
            access, and update your records in one secure place.
          </p>

          <h2 class="mt-4">Key Features:</h2>

          <ul>
            <li>
              Healthcare Professionals: Keep a record of your doctors,
              specialists, and healthcare providers. Select these professionals
              as medicine prescribers and/or healthcare providers of
              appointments
            </li>
            <li>
              Medication Tracker: Track your medication function, frequency, and
              prescribers to never miss a dose.
            </li>
            <li>
              Appointments: Schedule, track, and review your previous and
              upcoming medical appointments effortlessly. Make pre and
              post-appointment notes to keep track of your health history
            </li>
          </ul>

          <h2 class="mt-4">Why HealthBook?</h2>

          <ul>
            <li>
              Empowerment: Take control of your health journey by managing your
              own medical records and notes.
            </li>
            <li>
              Convenience: Access your health information anytime, anywhere.
            </li>
            <li>
              Peace of Mind: Ensure accurate and up-to-date information for
              better, more well-informed healthcare decisions.
            </li>
          </ul>

          <p>
            Register for HealthBook to enhance your awareness and knowledge of
            your personal health!
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
