package profile

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/auth"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/errors"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/response"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	"github.com/gofiber/fiber/v2"
	"net/http"
)

type handler struct {
	service Service
}

func RegisterHandlers(r fiber.Router, service Service) {
	h := handler{service}

	profile := r.Group("/profile", auth.Authorization)
	{
		profile.Get("/", h.getProfile)
		profile.Put("/", h.updateProfile)
	}
}

type profileResponse struct {
	Email      string `json:"email"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	IsVerified bool   `json:"is_verified"`
}

// @Tags Profile
// @Summary Retrieve a profile
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} profileResponse
// @Failure 400 {object} response.Error
// @Failure 403 {object} response.Error
// @Failure 500 {object} response.Error
// @Router /profile [get]
func (h *handler) getProfile(c *fiber.Ctx) error {
	user := c.Locals(auth.LocalUser).(domain.User)

	return c.Status(http.StatusOK).JSON(profileResponse{
		Email:      user.Email,
		FirstName:  user.FirstName,
		LastName:   user.LastName,
		IsVerified: *user.IsVerified,
	})
}

type updateProfileInput struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

// @Tags Profile
// @Summary Update a profile
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param input body updateProfileInput true "profile input"
// @Success 200 {object} response.Message
// @Failure 400 {object} response.Error
// @Failure 403 {object} response.Error
// @Failure 500 {object} response.Error
// @Router /profile [put]
func (h *handler) updateProfile(c *fiber.Ctx) error {
	user := c.Locals(auth.LocalUser).(domain.User)

	var input updateProfileInput
	if err := c.BodyParser(&input); err != nil {
		return response.NewError(c, errors.StatusBadRequest.LocaleWrapf(err, errors.ErrParseBody, errors.LocaleInvalidBody))
	}

	_, err := h.service.UpdateProfileByID(user.ID, UpdateUserProfileInput{
		FirstName: input.FirstName,
		LastName:  input.LastName,
	})
	if err != nil {
		return response.NewError(c, err)
	}

	return c.Status(http.StatusOK).JSON(response.Message{Message: "profile data has successfully updated"})
}