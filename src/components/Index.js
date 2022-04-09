import React, { Component } from "react";
import toastr from "cogo-toast";
import Create from "./Create";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      editUser: {},
    };
    this.backup = {
      users: [],
    };
    this.handleUpdateState = this.handleUpdateState.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortRA = this.sortRA.bind(this);
    this.sortApp = this.sortApp.bind(this);
  }

  handleUpdateState(data, operation) {
    console.log(data);
    if (operation === 1) {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => {
          if (user.id === data.id) return Object.assign(user, data);
          else return user;
        }),
      }));
      return;
    }
    let new_users = this.state.users.concat(data);
    let new_backup = this.backup.users.concat(data);
    this.setState({
      users: new_users,
    });
    this.setState(
      (this.backup = {
        users: new_backup,
      })
    );
  }
  handleEditUser(userId) {
    this.setState({
      editUser: this.state.users.find((x) => x.id === userId),
    });
  }
  handleDeleteUser(id) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user, i) => {
        return i !== id;
      }),
    }));
    toastr.success(`O aluno(a) foi deletado com sucesso!`, {
      position: "top-right",
      heading: "Sucesso",
    });
  }

  //Sort Functions
  sortName(data) {
    let backup = this.backup.users.concat(data);
    backup.pop();

    this.selectionSort(backup, (elem1, elem2) => {
      return elem1.nome > elem2.nome;
    });
    console.log("Ordenação por Nome: ", backup); //Sort names

    this.setState({
      users: backup,
    });
  }

  sortRA(data) {
    let backup = this.backup.users.concat(data);
    backup.pop();

    this.selectionSort(backup, (elem1, elem2) => {
      return elem1.ra < elem2.ra;
    });
    console.log("Ordenação por RA: ", backup); //Sort RA

    this.setState({
      users: backup,
    });
  }

  sortApp(data) {
    let backup = this.backup.users.concat(data);
    let appBackup = [];
    backup.forEach((student) => {
      if (student.resultado === "Aprovado") {
        appBackup.push(student);

        this.setState({
          users: appBackup,
        });
      }
    });

    this.selectionSort(appBackup, (elem1, elem2) => {
      return elem1.nome > elem2.nome;
    });
    console.log("Ordenação Aprovados: ", appBackup); //Sort Aprovados
  }

  selectionSort(vetor, fnComp) {
    for (let posSel = 0; posSel < vetor.length - 1; posSel++) {
      let posMenor = posSel + 1;
      for (let i = posMenor + 1; i < vetor.length; i++) {
        if (fnComp(vetor[posMenor], vetor[i])) {
          posMenor = i;
        }
      }
      if (fnComp(vetor[posSel], vetor[posMenor])) {
        [vetor[posSel], vetor[posMenor]] = [vetor[posMenor], vetor[posSel]];
      }
    }
  }

  render() {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="card-title"> Cadastro de Alunos </h4>
          <button
            type="button"
            className="btn btn-primary btn-sm pull-right"
            data-toggle="modal"
            data-target="#addModal"
          >
            {" "}
            Adicionar Aluno
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm pull-right"
            onClick={this.sortName}
          >
            {" "}
            Ordenar Nomes
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm pull-right"
            onClick={this.sortRA}
          >
            {" "}
            Ordenar RA
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm pull-right"
            onClick={this.sortApp}
          >
            {" "}
            Ordenar Aprovados
          </button>
        </div>
        <div className="card-body">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th> Id </th> */}
                  <th style={{ textAlign: "center" }}>Nome </th>
                  <th style={{ textAlign: "center" }}> R.A </th>
                  <th style={{ textAlign: "center" }}> Idade </th>
                  <th style={{ textAlign: "center" }}> Gênero </th>
                  <th style={{ textAlign: "center" }}> Média </th>
                  <th style={{ textAlign: "center" }}> Resultado </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => (
                  <tr key={i}>
                    {/* <td> {user.id} </td> */}
                    <td style={{ textAlign: "center" }}> {user.nome} </td>
                    <td style={{ textAlign: "center" }}> {user.ra} </td>
                    <td style={{ textAlign: "center" }}> {user.idade} </td>
                    <td style={{ textAlign: "center" }}> {user.genero} </td>
                    <td style={{ textAlign: "center" }}> {user.media} </td>
                    <td style={{ textAlign: "center" }}> {user.resultado} </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.handleDeleteUser.bind(this, i)}
                      >
                        {" "}
                        Remover{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Create updateState={this.handleUpdateState} />
      </div>
    );
  }
}
export default Index;
