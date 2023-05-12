import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { setNameTrainer } from "../store/name.Trainer,slice";
import { useDispatch } from "react-redux";

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

 const handleSubmit= (e) =>{
  e.preventDefault()
  dispatch(setNameTrainer(e.target.nameTrainer.value))
  navigate("/pokedex")
 }

  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto] text-center">
        {/* parte superior*/}
      <section>
        <article>
            <div className="">
                <img className="" src="/images/pokedex.png" alt="" />
            </div>
            <div className="text-4xl rounded-lg">
            <h2 className="text-4xl font-bold mt-20">Hello Trainer!</h2>
            <p className="text-2xl font-bold mt-4">Give me your name to start!:</p>
            </div>
            <form className="grid sm:px-20" onSubmit={handleSubmit}>
                <input className="mt-10 p-4 outline-none opacity-80 rounded-lg shadow-lg shadow-red-500 px-6" id="nameTrainer" type="text" placeholder="Your name..."/>
                <button className="mt-8 bg-red-600/80 mx-auto p-3 rounded-lg text-black font-['Akshar'] transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 mb-10">start!</button>
            </form>
        </article>
      </section>

      {/* Footer*/}
      <Footer/>
    </section>
  );
};

export default Home;
