class Task {
    constructor(id, title, description, startDate, endDate, status, teamMembers, completed = false, createdAt = new Date()){ 
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.teamMembers = teamMembers;
        this.completed = completed;
        this.createdAt = createdAt;
    }
}