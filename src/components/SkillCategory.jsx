// components/SkillCategory.js

<<<<<<< HEAD
const SkillCategory = ({ title, skills }) => {
    return (
      <div className="mb-8">
        {/* <h3 className="text-x4 font-normal mb-4 text-teal-500">{title}</h3> */}
        <h3 className="text-x4 font-normal mb-4 text-zinc-800 dark:text-zinc-100">{title}</h3>
=======
const SkillCategory = ({ title, skills, children }) => {
  return (
    <div className="mb-8">
      {/* <h3 className="text-x4 font-normal mb-4 text-teal-500">{title}</h3> */}
      <h3 className="text-x4 font-normal mb-4 text-zinc-800 dark:text-zinc-100">{title}</h3>
      {skills ? (
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-green-600 text-black px-2 py-1 rounded-xl text-sm transition duration-300 hover:bg-zinc-800 hover:text-slate-200"
            >
              {skill}
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </div>
    );
  };
  
  export default SkillCategory;
=======
      ) : (
        children
      )}
    </div>
  );
};

export default SkillCategory;
>>>>>>> 4d4ba25 (Initial commit: Portfolio website)
  