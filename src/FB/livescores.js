import React, { useState, useEffect } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from './firebase';
import 'semantic-ui-css/semantic.min.css';
import { Button, Input, Grid, Segment, Header } from 'semantic-ui-react';
import RunsDisplay from './RunsDisplay';

const LiveScores = () => {
  const [matches, setMatches] = useState({});
  const [matchData, setMatchData] = useState([]);
  const [numMatches, setNumMatches] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scoresRef = ref(db, 'scores');
    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMatches(data);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setMatchData(Array.from({ length: numMatches }, () => ({
      teamA: { runs: '', wickets: '' },
      teamB: { runs: '', wickets: '' }
    })));
  }, [numMatches]);

  const handleInputChange = (event, matchIndex, team, field) => {
    const value = event.target.value;
    setMatchData(prevMatchData => {
      const updatedMatchData = [...prevMatchData];
      updatedMatchData[matchIndex][team][field] = value;
      return updatedMatchData;
    });
  };

  const pushMatchData = () => {
    matchData.forEach((match, index) => {
      const matchRef = ref(db, `scores/match${index + 1}`);
      set(matchRef, match);
    });
  };

  const handleAddMatch = () => {
    setNumMatches(prevNumMatches => prevNumMatches + 1);
  };

  const handleDeleteMatch = (matchIndex) => {
    const matchRef = ref(db, `scores/match${matchIndex + 1}`);
    remove(matchRef);
    setMatchData(prevMatchData => {
      const updatedMatchData = [...prevMatchData];
      updatedMatchData.splice(matchIndex, 1);
      return updatedMatchData;
    });
    setNumMatches(prevNumMatches => prevNumMatches - 1);
  };

  const handleAddRuns = (team, runsToAdd) => {
    const updatedMatchData = [...matchData];
    updatedMatchData[0][team].runs = (parseInt(updatedMatchData[0][team].runs) || 0) + parseInt(runsToAdd);
    setMatchData(updatedMatchData);
  };

  const handleAddWickets = (team, wicketsToAdd) => {
    setMatchData(prevMatchData => {
      const updatedMatchData = [...prevMatchData];
      updatedMatchData[0][team].wickets = (parseInt(updatedMatchData[0][team].wickets) || 0) + parseInt(wicketsToAdd);
      return updatedMatchData;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Header as='h2'>Live Scores</Header>
        {matchData.map((match, index) => (
          <Segment key={index}>
            <Header as='h3'>Match {index + 1}</Header>
            <Grid columns={2}>
              <Grid.Column>
                <Segment>
                  <Header as='h4'>Team A</Header>
                  <RunsDisplay runs={match.teamA.runs} />
                  <Input
                    type="number"
                    value={match.teamA.runs}
                    onChange={(e) => handleInputChange(e, index, 'teamA', 'runs')}
                    placeholder="Runs"
                  /><br></br><br></br>
                  <Input
                    type="number"
                    value={match.teamA.wickets}
                    onChange={(e) => handleInputChange(e, index, 'teamA', 'wickets')}
                    placeholder="Wickets"
                  /><br></br><br></br>
                  <Button size='mini' color='yellow' onClick={() => handleAddRuns('teamA', 1)}>1</Button>
                  <Button size='mini' color='yellow' onClick={() => handleAddRuns('teamA', 2)}>2</Button>
                  <Button size='mini' color='yellow' onClick={() => handleAddRuns('teamA', 3)}>3</Button>
                  <Button size='mini' color='olive' onClick={() => handleAddRuns('teamA', 4)}>4</Button>
                  <Button size='mini' color='green' onClick={() => handleAddRuns('teamA', 6)}>6</Button><br></br><br></br>
                  <Button size='mini' color='red' onClick={() => handleAddWickets('teamA', 1)}>Add Wicket</Button>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as='h4'>Team B</Header>
                  <RunsDisplay runs={match.teamB.runs} />
                  <Input
                    type="number"
                    value={match.teamB.runs}
                    onChange={(e) => handleInputChange(e, index, 'teamB', 'runs')}
                    placeholder="Runs"
                  /><br></br><br></br>
                  <Input
                    type="number"
                    value={match.teamB.wickets}
                    onChange={(e) => handleInputChange(e, index, 'teamB', 'wickets')}
                    placeholder="Wickets"
                  /><br></br><br></br>
                  <Button size='mini' color='yellow' onClick={() => handleAddRuns('teamB', 1)}>1</Button>
                  <Button size='mini' color='yellow' onClick={() => handleAddRuns('teamB', 2)}>2</Button>
                  <Button size='mini' color='yellow' onClick={() => handleAddRuns('teamB', 3)}>3</Button>
                  <Button size='mini' color='olive' onClick={() => handleAddRuns('teamB', 4)}>4</Button>
                  <Button size='mini' color='green' onClick={() => handleAddRuns('teamB', 6)}>6</Button><br></br><br></br>
                  <Button size='mini' color='red' onClick={() => handleAddWickets('teamB', 1)}>Add Wicket</Button>
                </Segment>
              </Grid.Column>
            </Grid>
            <div className="button-container">
              <Button color='red' onClick={() => handleDeleteMatch(index)}>Delete Match</Button>
            </div>
          </Segment>
        ))}
        <div className="button-container">
          <Button color='blue' onClick={handleAddMatch}>Add Match</Button>
          <Button color='violet' onClick={pushMatchData}>Push Match Data</Button>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default LiveScores;