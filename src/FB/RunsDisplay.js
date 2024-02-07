import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { Container, Segment } from 'semantic-ui-react';
const RunsDisplay = ({ runs }) => {
  const [runsA, setRunsA] = useState('')
  const [runsB, setRunsB] = useState('')
  const [wicketsA, setwicketsA] = useState('')
  const [wicketsB, setwicketsB] = useState('')
  const [handleAddRuns, setMatchData] = useState('')

  function getScore() {
    const refAB = ref(db, 'scores/match1/')
    onValue(refAB, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setRunsA(data.teamA.runs)
        setRunsB(data.teamB.runs)
        setwicketsA(data.teamA.wickets)
        setwicketsB(data.teamB.wickets)
      } else {
        setRunsA('')
        setRunsB('')
        setwicketsA('')
        setwicketsB('')
      }
    })
  }
  useEffect(() => {
    getScore()
  }, [])

  return (
    <Segment>

      <div className="runs-display">
        <div>
          <h3 className="runs-display">Team A Runs: {runsA} - Wickets: {wicketsA}</h3>
          <h3 className="runs-display">Team B Runs: {runsB} - Wickets: {wicketsB}</h3>
          <p>{handleAddRuns}</p>
          <p>{setMatchData}</p>
        </div>
      </div>
    </Segment >
  );
};

export default RunsDisplay;