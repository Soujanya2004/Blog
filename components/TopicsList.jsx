import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { promises as fs } from "node:fs";

const checkEnvFile = async () => {
	try {
		await fs.access(".env.local");
		console.log(".env.local file is present");
		return true;
	} catch (error) {
		console.error(".env.local file is not present");
		return false;
	}
};

const getTopics = async () => {
	try {
		const envFileExists = await checkEnvFile();

		if (!envFileExists) {
			throw new Error(
				".env.local file is missing. Please create it with the required environment variables.",
			);
		}

		// Check if the MONGODB_URI is set
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not set in the .env.local file");
		}

		const res = await fetch("http://localhost:3000/api/topics", {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch topics");
		}

		return res.json();
	} catch (error) {
		console.error("Error loading topics: ", error.message);
		throw error; // Re-throw the error for the caller to handle
	}
};

export default async function TopicsList() {
	const { topics } = await getTopics();

	return (
		<div className="bg-gray-100 p-6 rounded-lg shadow-md">
			<h1 className="text-3xl font-semibold mb-4">Topics List</h1>
			{topics.length === 0 ? (
				<p className="text-gray-500">No topics available.</p>
			) : (
				topics.map((t) => (
					<div
						key={t._id}
						className="p-4 bg-white border border-gray-300 my-3 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
					>
						<div>
							<h2 className="font-bold text-2xl text-blue-600 hover:text-blue-800 cursor-pointer">
								{t.title}
							</h2>
							<div className="text-gray-700">{t.description}</div>
						</div>

						<div className="flex gap-2 mt-3">
							<RemoveBtn id={t._id} />
							<Link href={`/editTopic/${t._id}`}>
								<HiPencilAlt
									size={24}
									className="text-green-600 hover:text-green-800 transition-colors"
								/>
							</Link>
						</div>
					</div>
				))
			)}
		</div>
	);
}
