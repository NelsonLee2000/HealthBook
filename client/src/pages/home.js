import Layout from "../components/layout";

const Home = ({name}) => {
    return(
      <Layout name={name}>
        <div class='d-flex flex-column align-items-center'>
            <header class="my-4">
                <h1>Welcome to Healthbook!</h1>
            </header>

            <section class="w-50">
                <h2>Take Control of Your Health</h2>

                <p>Traditionally, your medical history has been scattered across different clinics, hospitals, and healthcare facilities. HealthBook is here to change that.</p>

                <h2 class="mt-5">Your Health, Your records</h2>

                <p>In a world where medical information is often controlled by providers, HealthBook empowers you to take charge of your health journey. No longer will you rely solely on the providers to keep track of your history - now, you're in control.</p>

                <h2 class="mt-5">Seamlessly Organize Your Health Data</h2>

                <p>From provider phone numbers and clinic addresses to prescription medicine and post-appointment notes, HealthBook simplifies the complex task of managing your health information. Easily organize, access, and update your records in one secure place.</p>

                <h2 class="mt-5">Key Features:</h2>

                <ul>
                    <li>Medical Professionals: Keep a record of your doctors, specialists, and healthcare providers.</li>
                    <li>Medication Tracker: Never miss a dose – track your medications and prescribers</li>
                    <li>Appointments: Schedule, track, and review your previous and upcoming medical appointments effortlessly.</li>
                </ul>

                <h2>Why Healthbook?</h2>

                <ul>
                    <li>Empowerment: Take control of your health journey by managing your own medical records and notes.</li>
                    <li>Convenience: Access your health information anytime, anywhere.</li>
                    <li>Peace of Mind: Ensure accurate and up-to-date information for better healthcare decisions.</li>
                </ul>

                <p>Sign up for Healthbook today and embrace a new era of health management – where your well-being is in your hands!</p>
            </section>
        </div>

        
        

      </Layout>
    ) 
   }; 
  
   export default Home;