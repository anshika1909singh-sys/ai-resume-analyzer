import { Link } from "react-router";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <h3 className="text-xl font-semibold mb-4 text-slate-900">{resume.jobTitle}</h3>
      <Link to={`/resume/${resume.id}`} className="block overflow-hidden rounded-3xl">
        <img src={resume.imagePath} alt={resume.jobTitle} className="w-full h-72 object-cover rounded-3xl" />
      </Link>
      <p className="mt-4 text-sm text-gray-500">{resume.companyName}</p>
    </div>
  );
};

export default ResumeCard;