<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <edit-profile-form></edit-profile-form>
      </div>
      <div class="col-md-4">
        <user-card
          :name="user.name"
          :title="user.title"
          :description="user.description"
          :img="profileImage"
        ></user-card>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileForm from "./Profile/EditProfileForm.vue";
import UserCard from "./Profile/UserCard.vue";

export default {
  name: "user-profile",
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      user: {
        name: "Mike Andrew",
        title: "Ceo/Co-Founder",
        description: "Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens' bed design but the back is..."
      }
    };
  },
  computed: {
    profileImage() {
      return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    }
  }
};
</script>

<style></style>
