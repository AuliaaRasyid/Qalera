import { useState, useEffect } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiEye2Fill,
  RiPencilFill,
} from "react-icons/ri";
import CreateTeamMod from "../../mods/admin/team/CreateTeamMod";
import ViewTeamMod from "../../mods/admin/team/ViewTeamMod";
import UpdateTeamMod from "../../mods/admin/team/UpdateTeamMod";

const DashboardTeams = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openViewModal = (team) => {
    setSelectedTeam(team);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTeam(null);
  };

  const openUpdateModal = (team) => {
    setSelectedTeam(team);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTeam(null);
  };

  // Example team data
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/team');
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      } else {
        console.error("Failed to fetch teams");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleDelete = async (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/team/${teamId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchTeams(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete team");
        }
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    }
  };

  const getImageUrl = (imageName) => {
    return `http://localhost:3000/uploads/team/${imageName}`;
  }

  return (
    <div className="flex flex-col w-full h-full gap-8 p-10 bg-blue-100">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Teams</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 space-x-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
        >
          <RiAddFill className="text-3xl" />
          <p className="text-lg">New Team</p>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
      {teams.map((team) => (
        <div key={team.teamId} className="relative w-full h-full p-5 transition duration-500 transform bg-white shadow-lg rounded-2xl">
          <div className="w-full h-48 mb-5 overflow-hidden">
            <img
              src={getImageUrl(team.teamImage)}
              alt={team.teamName}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">{team.teamName}</h1>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{team.teamPosition}</p>
          <div className="flex justify-between mt-6 space-x-2">
            <button
              onClick={() => openViewModal(team)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
            >
              <RiEye2Fill />
            </button>
            <button
              onClick={() => openUpdateModal(team)}
              className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-green-600 rounded-full shadow-lg hover:bg-green-700 hover:scale-105"
            >
              <RiPencilFill />
            </button>
            <button onClick={() => handleDelete(team.teamId)} className="flex items-center justify-center w-1/3 px-4 py-2 text-white transition-transform duration-200 ease-in-out transform bg-red-600 rounded-full shadow-lg hover:bg-red-700 hover:scale-105">
              <RiDeleteBinFill />
            </button>
          </div>
        </div>
        ))}
      </div>

      {/* Modals */}
      {isCreateModalOpen && <CreateTeamMod onClose={closeCreateModal} onCreated={fetchTeams} />}
      {isViewModalOpen && selectedTeam && (
        <ViewTeamMod
          isVisible={isViewModalOpen}
          onClose={closeViewModal}
          teamId={selectedTeam?.teamId}
        />
      )}
      {isUpdateModalOpen && selectedTeam && (
        <UpdateTeamMod
          onUpdated={fetchTeams}
          onClose={closeUpdateModal}
          team={selectedTeam}
        />
      )}
    </div>
  );
};

export default DashboardTeams;
