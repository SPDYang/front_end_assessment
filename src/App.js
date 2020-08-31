import React, { Component } from 'react';
import Profile from './components/Profile';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      ogData: null,
      displayData: [],
      searchName: "",
      searchTag: ""
    };
  }

  componentDidMount() {
    const apiUrl = "https://www.hatchways.io/api/assessment/students";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        let { students } = data;
        let ogData = {};
        for(let i = 0; i < students.length; ++i) {
          let sum = 0;
          let student = students[i];
          for(let j = 0; j < student.grades.length; ++j) {
            sum += parseInt(student.grades[j], 10);
          }
          student.average    = sum / student.grades.length;
          ogData[student.id] = student;
        }
        this.setState({ogData: ogData}, () => {
          this.displayDataGenerate();
        });
      });
  }

  displayDataGenerate = () => {
    let {
      ogData,
      searchName,
      searchTag
    } = this.state;
    
    if(ogData === null) return;

    let displayData = [...Object.values(ogData)];
    
    searchName = searchName.toLocaleLowerCase().replace(/\s+/g, ''); 
    searchTag  = searchTag.toLocaleLowerCase().replace(/\s+/g, '');

    if(searchName !== "") {
      displayData = displayData.filter(data => {
        return (data.firstName + data.lastName).toLocaleLowerCase().match(searchName);
      });
    }

    if(searchTag !== "") {
      displayData = displayData.filter(data => {
        if(data.tag === undefined) return false;
        for(const tagKey in data.tag) {
          if(data.tag[tagKey].toLocaleLowerCase().match(searchTag)) return true;
        }
        return false;
      });
    }
    
    this.setState({displayData: displayData});
  }

  tagAdd = (e, tag, key) => {
    e.preventDefault();
    
    let { ogData } = this.state;
    if(ogData[key].tag === undefined) ogData[key].tag = [];
    ogData[key].tag.push(tag);
    this.setState({ogData: ogData}, () => {
      this.displayDataGenerate();
    });
  }

  searchNameHandle = (e) => {
    this.setState({searchName: e.target.value}, () => {
      this.displayDataGenerate();
    });
  }

  searchTagHandle = (e) => {
    this.setState({searchTag: e.target.value}, () => {
      this.displayDataGenerate();
    });
  }

  render() {
    const {
      searchName,
      searchTag,
      displayData
    } = this.state;

    return(
      <div className="App">
        <div className="studentsList">
          <div className="searchDiv">
            <form>
              <input 
                id="name-input"
                placeholder="Search by name"
                type="text" 
                value={searchName} 
                onChange={this.searchNameHandle}
              ></input>
              <input 
                id="tag-input"
                placeholder="Search by tag"
                type="text" 
                value={searchTag} 
                onChange={this.searchTagHandle}
              ></input>
            </form>
          </div>
          <div>
            {
              displayData.map((data, index) => {
                return(
                  <Profile 
                    student={data} 
                    tagAdd={this.tagAdd}
                    key={data.id}
                  ></Profile>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

};

export default App;
