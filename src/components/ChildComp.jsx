import { useEffect, useState } from "react";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        // Fetch user data from the API
        const fetchUserData = async () => {
            try {
                setIsFetching(true)
                const response = await fetch("https://randomuser.me/api/?page=1&results=1&seed=abc");
                const data = await response.json();
                setUser(data.results[0]);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsFetching(false)
            }
        };

        fetchUserData();
    }, []);

    if (isFetching) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!isFetching && !user) {
        return <div className="flex justify-center items-center h-screen">No Data Found</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="flex items-center p-8 border border-gray-200 rounded-xl shadow-xl bg-white max-w-lg">

                <div className="w-36 h-36 border-4 border-blue-500 rounded-full overflow-hidden flex-shrink-0">
                    <img src={user.picture.large} alt="User" className="w-full h-full object-cover" />
                </div>

                <div className="ml-8">
                    <p className="text-3xl font-bold text-gray-800">
                        {user.name.first} {user.name.last}
                    </p>
                    <p className="text-lg text-gray-600 mt-2 capitalize">Gender: {user.gender}</p>
                    <p className="text-lg text-gray-600 mt-2">Phone: {user.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
