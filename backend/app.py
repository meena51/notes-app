from flask import Flask, request, jsonify
from models import db, Task
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Task Manager Backend is Running"

#create Task
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    
    # Validate incoming data
    if not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400

    # Create a new Task object
    new_task = Task(
        title=data['title'],
        description=data.get('description', '')
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        'message': 'Task created successfully',
        'task': {
            'id': new_task.id,
            'title': new_task.title,
            'description': new_task.description,
            'is_completed': new_task.is_completed
        }
    }), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()

    result = []
    for task in tasks:
        result.append({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'is_completed': task.is_completed
        })
    lres=[]
    for i in range(len(result)-1,-1,-1):
        lres.append(result[i])

    return jsonify(lres), 200

@app.route('/tasks/<int:id>', methods=['PUT'])
def toggle_completed(id):
    task = Task.query.get_or_404(id)

    # Toggle the status instead of forcing True
    task.is_completed = not task.is_completed
    db.session.commit()

    return jsonify({
        'message': 'Task status toggled',
        'task': {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'is_completed': task.is_completed
        }
    }), 200


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)

    db.session.delete(task)
    db.session.commit()

    return jsonify({'message': 'Task deleted successfully'}), 200

if __name__ == "__main__":
    app.run(debug=True)

