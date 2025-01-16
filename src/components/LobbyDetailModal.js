import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import { API_URL, WS_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

const LobbyDetailModal = ({ isOpen, onClose, lobby, onJoin }) => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");
  const stompClientRef = useRef(null);

  const { authState } = useContext(AuthContext);
  const token = authState.token;

  const exitLobby = async () => {
    try {
      const lobbyExitResponse = await axios.get(`${API_URL}/lobby/exit_lobby`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      if (lobbyExitResponse.data.status.toLowerCase() === "success") {
        navigate(`/`);
      } else {
        setError("Failed to exit lobby, please contact admin");
        console.log(lobbyExitResponse.data.message);
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const exitTabe = async () => {
    try {
      const tableExitResponse = await axios.get(`${API_URL}/table/exit_table`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (tableExitResponse.data.status.toLowerCase() === "success") {
        return tableExitResponse
      } else {
        setError("Failed to exit table");
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }



  useEffect(() => {
    const fetchLobbyAndTables = async () => {
      try {
        const tablesResponse = await axios.post(`${API_URL}/lobby/get_tables`, {
          lobby_id: lobby.id,
        });

        if (tablesResponse.data.status.toLowerCase() === "success") {
          const ts = tablesResponse.data.tables;
          for (const table of ts) {
            const usersResponse = await axios.post(`${API_URL}/table/get_users`, {
                table_id: table.id,
              }
            );
            if (usersResponse.data.status.toLowerCase() === "success") {
              table.players_joined = usersResponse.data.users.length;
            } else {
              setError(usersResponse.data.message || "Failed to fetch users");
              return;
            }
          }
          setTables(ts);
        } else {
          setError(tablesResponse.data.message || "Failed to fetch tables");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      }
    };
    fetchLobbyAndTables();
  }, [lobby]);

  useEffect(() => {
    stompClientRef.current = Stomp.over(() => new SockJS(WS_URL));
    stompClientRef.current.connect({}, (frame) => {
      stompClientRef.current.subscribe("/topic/lobby", (message) => {
        console.log(JSON.parse(message.body));
      });
    });

    stompClientRef.current.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, [lobby]);

  const handleJoinTable = async (tableId) => {
    try {
      const response = await axios.post(`${API_URL}/enter_lobby`, {lobby_id: lobby.id}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status.toLowerCase() === "success") {

        console.log("1. enter lobby - success")

        const tableEnterResponse = await axios.post(`${API_URL}/lobby/enter_table`, {
          table_id: tableId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (tableEnterResponse.data.status.toLowerCase() === "success") {
          
          console.log("2. enter table - success")

          navigate(`/lobby/${lobby.id}/${tableId}`);
        } else {
          console.log("3. enter table - fail, exiting")
          await exitTabe();
          await exitLobby()
          setError(tableEnterResponse.data.message || "Failed to join table")
        }

      } else {
        console.log("4. enter lobby - fail, exiting")
        await exitTabe();
        await exitLobby()
        setError(response.data.message || "Failed to join lobby")
      }
    } catch (err) {
      console.log("ERRRRRRR");
      console.error(err);
      return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-1">{lobby.name}</h2>
        <div className="mb-6">
          <div className="">
            <p>
              <strong>Lobby ID:</strong> {lobby.id}
            </p>
            <p>
              <strong>Host:</strong> {lobby.host_id.username}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(lobby.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Min Players:</strong> {lobby.min_players}
            </p>
            <p>
              <strong>Max Players:</strong> {lobby.max_players}
            </p>
            <p>
              <strong>Blind Size:</strong> ${lobby.blind}
            </p>
          </div>
        </div>

        { error && (<div className="mb-4 text-red-500">Error: {error}</div>)}

        {tables.length === 0 ? (
          <div className="w-fit m-auto">Loading...</div>
        ) : (
          <div className="space-y-2">
            {tables.map((table, index) => (
              <div
                key={table.id}
                className="border p-2 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Table #{index + 1}</p>
                  <p>
                    {table.players_joined} / {lobby.max_players} players joined
                  </p>
                </div>
                <button
                  onClick={() => handleJoinTable(table.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Join Table
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex mt-5 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyDetailModal;
