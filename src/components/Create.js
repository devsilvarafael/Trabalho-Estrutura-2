import React, { Component } from "react";
import toastr from "cogo-toast";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      nome: "",
      ra: "",
      idade: "",
      genero: "",
      media: "",
      resultado: "",
    };
    this.baseState = this.state;
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.handleInsertUser = this.handleInsertUser.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }
  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleInsertUser(e) {
    e.preventDefault();

    const data = {
      id: Math.floor(Math.random() * 100),
      nome: this.state.nome,
      ra: this.state.ra,
      idade: this.state.idade,
      genero: this.state.genero,
      media: this.state.media,
    };
    if (!this.checkValidation(data)) {
      this.reset();
      this.props.updateState(data, 0);
      document.getElementById("closeAddModal").click();
      toastr.success("Usuário criado com sucesso!", {
        position: "top-right",
        heading: "Sucesso",
      });
    }
  }

  checkValidation(fields) {
    var error = {};
    if (fields.nome.length === 0) {
      error.nome = ["Esse campo é obrigatório"];
    }
    if (fields.ra.length !== 13) {
      error.ra = ["O RA deve conter 13 digitos"];
    }
    if (fields.idade.length === 0) {
      error.idade = ["Esse campo é obrigatório"];
    }
    if (fields.genero.length === 0) {
      error.genero = ["Esse campo é obrigatório"];
    }
    if (fields.media.length === 0) {
      error.media = ["Esse campo é obrigatório"];
    }
    this.setState({
      errors: error,
    });
    if (
      fields.nome.length === 0 ||
      fields.ra.length === 0 ||
      fields.ra.length !== 13 ||
      fields.idade.length === 0 ||
      fields.genero.length === 0 ||
      fields.media.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  reset() {
    this.setState(this.baseState);
  }
  hasErrorFor(fieldName) {
    return !!this.state.errors[fieldName];
  }
  renderErrorFor(fieldName) {
    if (this.hasErrorFor(fieldName)) {
      return (
        <em className="error invalid-feedback">
          {" "}
          {this.state.errors[fieldName][0]}{" "}
        </em>
      );
    }
  }

  render() {
    return (
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Novo Aluno</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleInsertUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="nome" className="col-form-label">
                    Nome:
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      this.hasErrorFor("nome") ? "is-invalid" : ""
                    }`}
                    id="nome"
                    name="nome"
                    placeholder="Nome:"
                    onChange={this.handleInputFieldChange}
                    value={this.state.nome}
                  />
                  {this.renderErrorFor("nome")}
                </div>
                <div className="form-group">
                  <label htmlFor="ra" className="col-form-label">
                    RA:
                  </label>
                  <input
                    type="number"
                    className={`form-control form-control-sm ${
                      this.hasErrorFor("ra") ? "is-invalid" : ""
                    }`}
                    id="ra"
                    name="ra"
                    placeholder="RA:"
                    onChange={this.handleInputFieldChange}
                    value={this.state.ra}
                  />
                  {this.renderErrorFor("ra")}
                </div>
                <div className="form-group">
                  <label htmlFor="idade" className="col-form-label">
                    Idade:
                  </label>
                  <input
                    type="number"
                    className={`form-control form-control-sm ${
                      this.hasErrorFor("idade") ? "is-invalid" : ""
                    }`}
                    id="idade"
                    name="idade"
                    placeholder="Idade:"
                    onChange={this.handleInputFieldChange}
                    value={this.state.idade}
                  />
                  {this.renderErrorFor("idade")}
                </div>
                <div className="form-group">
                  <label htmlFor="genero" className="col-form-label">
                    Genêro:
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${
                      this.hasErrorFor("genero") ? "is-invalid" : ""
                    }`}
                    id="genero"
                    name="genero"
                    placeholder="Genêro:"
                    onChange={this.handleInputFieldChange}
                    value={this.state.genero}
                  />
                  {this.renderErrorFor("idade")}
                </div>
                <div className="form-group">
                  <label htmlFor="media" className="col-form-label">
                    Média:
                  </label>
                  <input
                    type="number"
                    className={`form-control form-control-sm ${
                      this.hasErrorFor("media") ? "is-invalid" : ""
                    }`}
                    id="media"
                    name="media"
                    placeholder="Média:"
                    onChange={this.handleInputFieldChange}
                    value={this.state.media}
                  />
                  {this.renderErrorFor("media")}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="closeAddModal"
                  className="btn btn-danger btn-sm"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Create;
